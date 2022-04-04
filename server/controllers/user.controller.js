const User = require('../models/user.model');
const escape = require('escape-html');
const aws = require('aws-sdk');
const {
    updateValidation,
    updateValidationAdmin,
} = require('../util/validation');

aws.config.update({
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: process.env.S3_DEFAULT_REGION,
});
const s3 = new aws.S3();

/**
 * @desc This function returns users by user id.
 * @route GET /user/:userId
 * @access User
 */
exports.getUserById = async (req, res) => {
    const userId = escape(req.params.userId);

    User.findById(userId)
        .populate('site')
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json(err));
};

/**
 * @desc This function returns users by site.
 * @route GET /user/site/:siteid
 * @access Admin
 */
exports.getUsersBySite = async (req, res) => {
    const siteId = escape(req.params.siteId);

    User.find({ site: siteId, type: 2 })
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(400).json(err));
};

/**
 * @desc This function updates users by id.
 * @route PUT /user/:userId
 * @access User
 */
exports.updateUserById = (req, res) => {
    const updateQuery = {};
    if (req.body.firstName) updateQuery.firstName = escape(req.body.firstName);
    if (req.body.lastName) updateQuery.lastName = escape(req.body.lastName);
    if (req.body.phone) updateQuery.phone = escape(req.body.phone);
    if (req.body.email) updateQuery.email = escape(req.body.email);
    if (req.body.avatar) updateQuery.avatar = escape(req.body.avatar);
    if (req.body.bio) updateQuery.bio = escape(req.body.bio);
    if (req.body.verified) updateQuery.verified = escape(req.body.verified);
    if (req.body.site) updateQuery.site = escape(req.body.site);
    const userId = escape(req.params.userId);

    const { error } = updateValidation(updateQuery);
    if (error) return res.status(400).json(error.details[0].message);

    User.findByIdAndUpdate(userId, updateQuery, { new: true })
        .then((user) => {
            if (!user) res.status(404).json('Error: User ID does not exist.');
            res.status(200).json(user);
        })
        .catch((err) => res.status(400).json(err));
};

/**
 * @desc This function updates users by id as admin
 * @route PUT /user/:userId/admin
 * @access Admin
 */
exports.updateUserAsAdmin = async (req, res) => {
    const userId = escape(req.params.userId);
    const updateQuery = {};
    if (req.body.firstName) updateQuery.firstName = escape(req.body.firstName);
    if (req.body.lastName) updateQuery.lastName = escape(req.body.lastName);
    if (req.body.hourlyRate)
        updateQuery.hourlyRate = escape(req.body.hourlyRate);
    if (req.body.taxRate) updateQuery.taxRate = escape(req.body.taxRate);

    const { error } = updateValidationAdmin(updateQuery);
    if (error) return res.status(400).json(error.details[0].message);

    try {
        const user = await User.findByIdAndUpdate(userId, updateQuery, {
            new: true,
        });
        if (!user) res.status(404).json('Error: User ID does not exist.');
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * @desc This function activates/deactivates users by id.
 * @route PUT /user/:userId/:siteId/activate
 * @access Admin
 */
exports.toggleUserActivatedById = async (req, res) => {
    const userId = escape(req.params.userId);
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return res.status(404).send('User not found.');
    }

    if (!user) return res.status(404).json('Error: User ID does not exist.');
    if (user.site != req.user.site)
        return res.status(404).json('User is not part of this site.');

    const updateQuery = { activated: !user.activated };

    User.findByIdAndUpdate(userId, updateQuery, { new: true })
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json(err));
};

/**
 * @desc This function updates the users Profile Picture
 * @route GET /user/images/:key
 * @access PUBLIC
 */
exports.getProfilePicture = (req, res) => {
    const fileKey = escape(req.params.key);
    const downloadParams = {
        Key: fileKey,
        Bucket: process.env.S3_PROFILE_BUCKET,
    };

    const readStream = s3.getObject(downloadParams).createReadStream();
    readStream.pipe(res);
};

/**
 * @desc This function checks if a password reset code exists
 * @route GET /user/:userId/passwordresetcode/:passwordResetCode
 * @access USER
 */
exports.findUserByPasswordResetCode = async (req, res) => {
    const passwordResetCode = escape(req.params.passwordResetCode);

    try {
        const user = await User.findOne({ passwordResetCode });
        if (!user) {
            return res
                .status(404)
                .json('Error: Password reset code not exist.');
        }
        return res.status(200).json('Password reset code is valid.');
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * @desc This function updates the users Profile Picture
 * @route PUT /user/:userId/updatepicture
 * @access USER
 */
exports.updateProfilePicture = async (req, res) => {
    if (!req.file) return res.status(400).send('No image uploaded');
    const userId = escape(req.params.userId);

    const updateQuery = { avatar: 'user/images/' + req.file.key };

    User.findByIdAndUpdate(userId, updateQuery, { new: true })
        .populate('site')
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json(err));
};

exports.deleteProfilePicture = (req, res) => {
    const userId = escape(req.params.userId);
    const updateQuery = { avatar: undefined };

    User.findByIdAndUpdate(userId, updateQuery)
        .then((user) => {
            if (user.avatar) {
                const fileKey = user.avatar.split('/')[2];
                const deleteParams = {
                    Key: fileKey,
                    Bucket: process.env.S3_PROFILE_BUCKET,
                };
                try {
                    s3.deleteObject(deleteParams);
                    res.status(200).json(user);
                } catch (err) {
                    res.status(400).json(err);
                }
            }
        })
        .catch((err) => res.status(400).json(err));
};
