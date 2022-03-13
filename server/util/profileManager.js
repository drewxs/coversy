const aws = require('aws-sdk');

aws.config.update({
	secretAccessKey: process.env.S3_ACCESS_SECRET,
	accessKeyId: process.env.S3_ACCESS_KEY,
});
const s3 = new aws.S3({ params: { Bucket: process.env.S3_PROFILE_BUCKET } });

exports.fetchProfile = async (user) => {
	s3.getObject(
		{
			Key: user.avatar,
		},
		function (err, data) {
			const buffered = Buffer.from(data.Body);
			return buffered.toString('base64');
		}
	);
};
