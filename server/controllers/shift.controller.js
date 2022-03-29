const User = require('../models/user.model');
const Shift = require('../models/shift.model');
const escape = require('escape-html');
const aws = require('aws-sdk');
const { createNotification } = require('./notification.controller');

aws.config.update({
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: process.env.S3_DEFAULT_REGION,
});
const s3 = new aws.S3();

/**
 * @desc This function creates a shift.
 * @route POST /shift
 * @access Admin
 */
exports.createShift = async (req, res) => {
    const email = escape(req.body.teacher);
    const startTime = new Date(escape(req.body.startTime));
    const endTime = new Date(escape(req.body.endTime));
    const subject = escape(req.body.subject);

    try {
        // Check if teacher exists
        let teacher = await User.findOne({ email: email }).exec();
        if (!teacher)
            return res.status(404).json(`Teacher not found: ${email}`);
        if (teacher.site != req.user.site)
            return res.status(400).json('Teacher does not belong to this site');

        // Check if shift already exists
        let existingShift = await Shift.findOne({
            teacher: teacher._id,
            startTime,
            endTime,
        }).lean();
        if (existingShift) return res.status(400).json('Shift already exists');

        const shiftObj = {
            teacher: escape(teacher._id),
            startTime,
            endTime,
            subject,
            site: escape(req.user.site),
        };
        if (req.body.details) shiftObj.details = escape(req.body.details);

        const shift = await Shift.create(shiftObj);
        await shift.populate('teacher', 'firstName lastName email');
        return res.status(201).json(shift);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * @desc This function returns shift by shift Id.
 * @route GET /shift/id/:shiftId
 * @access Admin
 */
exports.getShiftById = (req, res) => {
    const shiftId = escape(req.params.shiftId);

    Shift.findById(shiftId)
        .then((shift) => res.status(200).json(shift))
        .catch((err) => res.status(400).json(err));
};

/**
 * @desc This function returns shifts by site.
 * @route GET /shift/
 * @access Admin
 */
exports.getShiftsBySite = (req, res) => {
    Shift.find({ site: req.user.site })
        .populate('teacher', 'firstName lastName email')
        .then((shifts) => res.status(200).json(shifts))
        .catch((err) => res.status(400).json(err));
};

/**
 * @desc This function returns posted shifts by site.
 * @route GET /shift/posted
 * @access Admin
 */
exports.getPostedShiftsBySite = (req, res) => {
    Shift.find({ site: req.user.site, posted: true })
        .populate('teacher', 'firstName lastName email')
        .then((shifts) => res.status(200).json(shifts))
        .catch((err) => res.status(400).json(err));
};

/**
 * @desc This function updates shifts by shift id.
 * @route PUT /shift/:shiftId
 * @access Admin
 */
exports.updateShiftById = (req, res) => {
    const updateQuery = {};
    if (req.body.sub) updateQuery.sub = escape(req.body.sub);
    if (req.body.details) updateQuery.details = escape(req.body.details);
    if (req.body.startTime) updateQuery.startTime = escape(req.body.startTime);
    if (req.body.endTime) updateQuery.endTime = escape(req.body.endTime);
    if (req.body.site) updateQuery.site = escape(req.body.site);

    const shiftId = escape(req.params.shiftId);

    Shift.findByIdAndUpdate(shiftId, updateQuery)
        .then((shift) => res.status(200).json(shift))
        .catch((err) => res.status(400).json(err));
};

exports.getShiftMaterials = (req, res) => {
    const shiftId = escape(req.params.shiftId);
    const fileName = escape(req.params.fileName);

    Shift.findById(shiftId)
        .then((shift) => {
            shift.materials.forEach((material) => {
                if (material.fileName === fileName) {
                    const downloadParams = {
                        Key: material.fileKey,
                        Bucket: process.env.S3_SHIFT_BUCKET,
                    };
                    const readStream = s3
                        .getObject(downloadParams)
                        .createReadStream();
                    readStream.pipe(res.attachment(material.fileName));
                }
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

/**
 * @desc This function updates shift materials by ID.
 * @route PUT /shift/:shiftId/uploadfiles
 * @access User
 */

exports.updateShiftMaterials = (req, res) => {
    if (!req.files) return res.status(400).send('No files uploaded');
    const shiftId = escape(req.params.shiftId);

    const updateQuery = { materials: [] };

    req.files.forEach((file) => {
        updateQuery.materials.push({
            fileName: file.originalname,
            fileKey: file.key,
        });
    });

    Shift.findByIdAndUpdate(shiftId, updateQuery, { new: true })
        .then((shift) => res.status(200).json(shift))
        .catch((err) => res.status(400).json(err));
};

/**
 * @desc This function deletes all shifts from a site
 * @route DELETE /site/:siteId
 * @access Admin
 */
exports.deleteShiftsBySite = (req, res) => {
    Shift.deleteMany({ site: req.user.site })
        .then(() => res.status(200).json('Shifts successfully deleted'))
        .catch((err) => res.status(400).send(err));
};

/**
 * @desc This function posts a shift
 * @route PUT /:shiftId/post
 * @access User
 */
exports.postShift = async (req, res) => {
    try {
        const shift = await Shift.findByIdAndUpdate(
            escape(req.params.shiftId),
            { posted: true },
            { new: true }
        );
        res.status(200).json(shift);
    } catch (err) {
        res.status(400).json(err.message);
    }
};

/**
 * @desc This function posts a shift
 * @route PUT /:shiftId/unpost
 * @access User
 */
exports.unpostShift = async (req, res) => {
    try {
        const shift = await Shift.findByIdAndUpdate(
            escape(req.params.shiftId),
            { posted: false },
            { new: true }
        );
        res.status(200).json(shift);
    } catch (err) {
        res.status(400).json(err.message);
    }
};

/**
 * @desc This function takes a shift
 * @route PUT /:shiftId/take
 * @access User
 */
exports.takeShift = async (req, res) => {
    const shiftId = escape(req.params.shiftId);
    const updateQuery = { posted: false, sub: req.user._id };

    try {
        const shift = await Shift.findByIdAndUpdate(shiftId, updateQuery, {
            new: true,
        }).populate('teacher');
        createNotification(
            shift.sub,
            shift.teacher,
            `${shift.sub} has taken your shift on ${shift.date}`
        );
        return res.status(200).json(shift);
    } catch (err) {
        res.status(400).json(err.message);
    }
};
