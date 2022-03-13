const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Friendly suggestion, don't touch this, it doesn't look nice, but it works.
// It's a gentle breeze away from not working entirely, so it's best to just leave it alone

aws.config.update({
	secretAccessKey: process.env.S3_ACCESS_SECRET,
	accessKeyId: process.env.S3_ACCESS_KEY,
	region: process.env.S3_DEFAULT_REGION,
});
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type'), false);
	}
};

const profileUploader = multer({
	fileFilter,
	storage: multerS3({
		s3: s3,
		bucket: process.env.S3_PROFILE_BUCKET,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		metadata: (req, file, cb) => {
			cb(null, { fieldName: file.fieldname });
		},
		key: (req, file, cb) => {
			cb(null, Date.now().toString());
		},
	}),
});

module.exports = profileUploader;
