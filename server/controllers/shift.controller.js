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

/** @module shift_controller */

/**
 * This function creates a shift.
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Created shift
 */
exports.createShift = async (req, res) => {
  const email = escape(req.body.teacher);
  const startTime = new Date(escape(req.body.startTime));
  const endTime = new Date(escape(req.body.endTime));
  const subject = escape(req.body.subject);

  try {
    // Check if teacher exists
    let teacher = await User.findOne({ email }).lean();
    if (!teacher) return res.status(404).json(`Teacher not found: ${email}`);
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
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Shift corresponding to the id
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
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} - Shifts belonging to the user's site
 */
exports.getShiftsBySite = async (req, res) => {
  try {
    const shifts = await Shift.find({ site: req.user.site })
      .lean()
      .populate('teacher', 'firstName lastName email')
      .populate('sub', 'firstName lastName email');
    return res.status(200).json(shifts);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

/**
 * This function returns shifts belonging to the user.
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} - Shifts belonging to the user
 */
exports.getShiftsByUser = async (req, res) => {
  try {
    const shifts = await Shift.find({
      site: req.user.site,
      $or: [
        { teacher: req.user._id },
        {
          $and: [{ $not: { teacher: req.user._id } }, { sub: req.user._id }],
        },
      ],
    })
      .lean()
      .populate('teacher', 'firstName lastName email')
      .populate('sub', 'firstName lastName email');

    return res.status(200).json(shifts);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

/**
 * This function returns posted shifts by site.
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} - Posted shifts belonging to the user's site
 */
exports.getPostedShiftsBySite = async (req, res) => {
  try {
    const shifts = await Shift.find({
      site: req.user.site,
      posted: true,
      teacher: { $ne: req.user._id },
    })
      .lean()
      .populate('teacher', 'firstName lastName email')
      .populate('sub', 'firstName lastName email');
    return res.status(200).json(shifts);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

/**
 * This function updates shifts by shift id.
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Updated shift
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

  if (updateQuery.subject?.length > 20) {
    return res.status(400).json('Subject cannot be more than 20 characters');
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
 * This function retrieves materials from a shift via S3.
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object[]} - Materials from the shift
 */
exports.getShiftMaterials = async (req, res) => {
  const shiftId = escape(req.params.shiftId);
  const fileKey = escape(req.params.fileKey);

  try {
    const shift = await Shift.findById(shiftId).lean();
    shift.materials.forEach(async (material) => {
      if (material.fileKey === fileKey) {
        const downloadParams = {
          Key: material.fileKey,
          Bucket: process.env.S3_SHIFT_BUCKET,
        };
        const readStream = await s3.getObject(downloadParams);
        readStream
          .createReadStream()
          .on('error', (err) => {
            return res.status(err.statusCode).json(err.message);
          })
          .pipe(res.attachment(material.fileName));
      }
    });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

/**
 * This function updates shift materials, to be used after s3 upload middleware.
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Updated shift with the uploaded materials
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
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Updated shift without the deleted material
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
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {String} - Message confirming deletion
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
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Shift posted
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
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Shift unposted
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
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Shift taken
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

    if (req.user._id !== shift.teacher._id) {
      createNotification(shift.sub, shift.teacher, `Shift`, shift);
    }

    return res.status(200).json(shift);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

/**
 * This function returns a shift
 *
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Shift returned
 */
exports.returnShift = async (req, res) => {
  const shiftId = escape(req.params.shiftId);

  try {
    let shift = await Shift.findById(shiftId)
      .populate('teacher', 'firstName lastName email')
      .populate('sub', 'firstName lastName email');

    if (req.user._id != shift.sub._id) {
      return res.status(400).json('Must be substitute to return shift.');
    }

    const shiftSub = shift.sub;

    shift.posted = true;
    shift.sub = null;
    await shift.save();

    createNotification(shiftSub, shift.teacher, `Shift_Return`, shift);

    return res.status(200).json(shift);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
