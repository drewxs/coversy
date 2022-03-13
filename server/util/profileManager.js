const aws = require('aws-sdk');

aws.config.update({
	secretAccessKey: process.env.S3_ACCESS_SECRET,
	accessKeyId: process.env.S3_ACCESS_KEY,
});
const s3 = new aws.S3();

exports.fetchProfile = (key) => {
	const downloadParams = {
		Bucket: process.env.S3_PROFILE_BUCKET,
		Key: key,
	};
	s3.getObject({ downloadParams }, function (err, data) {
		if (err) return err;
		else return data;
	});
};
