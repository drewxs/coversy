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
 * This function creates a shift.
 *
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
        let teacher = await User.findOne({ email }).lean();
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
 * This function returns shift by shift Id.
 *
 * @route GET /shift/id/:shiftId
 * @access Admin
 */
exports.getShiftById = async (req, res) => {
    const shiftId = escape(req.params.shiftId);

    try {
        const shift = await Shift.findById(shiftId).lean();
        return res.status(200).json(shift);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function returns shifts by site.
 *
 * @route GET /shift/
 * @access Admin
 */
exports.getShiftsBySite = async (req, res) => {
    try {
        const shifts = await Shift.find({ site: req.user.site })
            .lean()
            .populate('teacher', 'firstName lastName email');
        return res.status(200).json(shifts);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function returns shifts belonging to the user.
 *
 * @route GET /shift/
 * @access Admin
 */
exports.getShiftsByUser = async (req, res) => {
    try {
        const shifts = await Shift.find({
            site: req.user.site,
            $or: [
                { teacher: req.user._id },
                {
                    $and: [
                        { $not: { teacher: req.user._id } },
                        { sub: req.user._id },
                    ],
                },
            ],
        })
            .lean()
            .populate('teacher', 'firstName lastName email');

        return res.status(200).json(shifts);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function returns posted shifts by site.
 *
 * @route GET /shift/posted
 * @access Admin
 */
exports.getPostedShiftsBySite = async (req, res) => {
    try {
        const shifts = await Shift.find({
            site: req.user.site,
            posted: true,
            teacher: { $ne: req.user._id },
        })
            .lean()
            .populate('teacher', 'firstName lastName email');
        return res.status(200).json(shifts);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function updates shifts by shift id.
 *
 * @route PUT /shift/:shiftId
 * @access Admin
 */
exports.updateShiftById = async (req, res) => {
    const updateQuery = {};
    if (req.body.teacher) updateQuery.teacher = escape(req.body.teacher);
    if (req.body.sub) updateQuery.sub = escape(req.body.sub);
    if (req.body.subject) updateQuery.subject = escape(req.body.subject);
    if (req.body.details) updateQuery.details = escape(req.body.details);
    if (req.body.startTime) updateQuery.startTime = escape(req.body.startTime);
    if (req.body.endTime) updateQuery.endTime = escape(req.body.endTime);
    if (req.body.site) updateQuery.site = escape(req.body.site);

    const shiftId = escape(req.params.shiftId);

    if (updateQuery.subject.length > 20) {
        return res
            .status(400)
            .json('Subject cannot be more than 20 characters');
    }

    if (new Date(updateQuery.startTime) >= new Date(updateQuery.endTime)) {
        return res.status(400).json('Start time must be before end time');
    }

    try {
        const shift = await Shift.findByIdAndUpdate(shiftId, updateQuery, {
            new: true,
        });
        await shift.populate('teacher', 'firstName lastName email');
        return res.status(200).json(shift);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function retrieves a single material from a shift via S3.
 *
 * @route GET /shift/:shiftId/files/:fileKey
 * @access User
 */
exports.getShiftMaterials = async (req, res) => {
    const shiftId = escape(req.params.shiftId);
    const fileKey = escape(req.params.fileKey);

    try {
        const shift = await Shift.findById(shiftId).lean();
        shift.materials.forEach((material) => {
            if (material.fileKey === fileKey) {
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
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function updates shift materials, to be used after s3 upload middleware.
 *
 * @route PUT /shift/:shiftId/files/upload
 * @access User
 */

exports.updateShiftMaterials = async (req, res) => {
    if (!req.files) return res.status(400).send('No files uploaded');
    const shiftId = escape(req.params.shiftId);
    let updateQuery;
    try {
        let shift = await Shift.findById(shiftId).lean();
        updateQuery = { materials: shift.materials };
    } catch (err) {
        return res.status(400).send('Failed to get Current Files');
    }

    req.files.forEach((file) => {
        updateQuery.materials.push({
            fileName: file.originalname,
            fileKey: file.key,
        });
    });

    try {
        const shift = await Shift.findByIdAndUpdate(shiftId, updateQuery, {
            new: true,
        }).populate('teacher', 'firstName lastName email');
        return res.status(200).json(shift);
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

/**
 * This function deletes a single material from a shift via S3.
 *
 * @route DELETE /shift/:shiftId/files/:fileKey
 * @access User
 */
exports.deleteShiftMaterial = async (req, res) => {
    const shiftId = escape(req.params.shiftId);
    const fileKey = escape(req.params.fileKey);
    const deleteParams = {
        Key: fileKey,
        Bucket: process.env.S3_SHIFT_BUCKET,
    };

    let updateQuery = {};
    try {
        let shift = await Shift.findById(shiftId).lean();
        updateQuery = {
            materials: shift.materials.filter(
                (material) => material.fileKey != fileKey
            ),
        };
        await s3.deleteObject(deleteParams).promise();
    } catch (err) {
        console.error(err);
    }

    try {
        const shift = await Shift.findByIdAndUpdate(shiftId, updateQuery, {
            new: true,
        }).populate('teacher', 'firstName lastName email');
        return res.status(200).json(shift);
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

/**
 * This function deletes all shifts from a site
 *
 * @route DELETE /site/:siteId
 * @access Admin
 */
exports.deleteShiftsBySite = async (req, res) => {
    try {
        await Shift.deleteMany({ site: req.user.site });
        return res.status(200).json('Shifts successfully deleted');
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function posts a shift
 *
 * @route PUT /:shiftId/post
 * @access User
 */
exports.postShift = async (req, res) => {
    try {
        const shift = await Shift.findByIdAndUpdate(
            escape(req.params.shiftId),
            { posted: true },
            { new: true }
        ).populate('teacher', 'firstName lastName email');

        return res.status(200).json(shift);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function unposts a shift
 *
 * @route PUT /:shiftId/unpost
 * @access User
 */
exports.unpostShift = async (req, res) => {
    const shiftId = escape(req.params.shiftId);
    try {
        const shift = await Shift.findById(shiftId);

        if (shift.sub) return res.status(400).json('Shift has been taken.');

        shift.posted = false;
        shift.populate('teacher', 'firstName lastName email');

        await shift.save();

        return res.status(200).json(shift);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function takes a shift
 *
 * @route PUT /:shiftId/take
 * @access User
 */
exports.takeShift = async (req, res) => {
    const shiftId = escape(req.params.shiftId);
    const updateQuery = { posted: false, sub: req.user._id };

    try {
        const shift = await Shift.findByIdAndUpdate(shiftId, updateQuery, {
            new: true,
        })
            .populate('teacher', 'firstName lastName email')
            .populate('sub', 'firstName lastName email');

        createNotification(shift.sub, shift.teacher, `Shift`, shift);

        return res.status(200).json(shift);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * This function untakes a shift
 *
 * @route PUT /:shiftId/take
 * @access User
 */
exports.returnShift = async (req, res) => {
    const shiftId = escape(req.params.shiftId);
    const updateQuery = { posted: true, sub: null };

    try {
        const shift = await Shift.findByIdAndUpdate(shiftId, updateQuery, {
            new: true,
        }).populate('teacher', 'firstName lastName email');

        createNotification(
            shift.sub,
            shift.teacher,
            `Shift was taken`,
            `${
                shift.sub.firstName + ' ' + shift.sub.lastName
            }  has returned your shift on ${shift.startTime}`
        );

        return res.status(200).json(shift);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};
