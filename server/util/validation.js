const Joi = require('joi');

exports.registerValidation = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().max(64).required(),
		lastName: Joi.string().max(64).required(),
		middleInitial: Joi.string().min(1).max(1),
		type: Joi.number().min(1).max(3).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(128).required(),
	});
	return schema.validate(data);
};

exports.loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(128).required(),
	});
	return schema.validate(data);
};

exports.updateValidation = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().max(64).required(),
		lastName: Joi.string().max(64).required(),
		middleInitial: Joi.string().min(1).max(1),
	});
	return schema.validate(data);
};
