const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const alphanumericPattern = /^[a-zA-Z0-9 ]+$/;

exports.registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .max(64)
            .regex(alphanumericPattern)
            .message('No special characters allowed.')
            .required(),
        lastName: Joi.string()
            .max(64)
            .regex(alphanumericPattern)
            .message('No special characters allowed.')
            .required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(128).required(),
        site: Joi.objectId(),
        type: Joi.number(),
        activated: Joi.boolean(),
    });
    return schema.validate(data);
};

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
};

exports.updateValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .max(64)
            .regex(alphanumericPattern)
            .message('No special characters allowed for name.'),
        lastName: Joi.string()
            .max(64)
            .regex(alphanumericPattern)
            .message('No special characters allowed for name.'),
        middleInitial: Joi.string().min(1).max(1),
        phone: Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/),
    });
    return schema.validate(data);
};

exports.updateValidationAdmin = (data) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .max(64)
            .regex(alphanumericPattern)
            .message('No special characters allowed for name.'),
        lastName: Joi.string()
            .max(64)
            .regex(alphanumericPattern)
            .message('No special characters allowed for name.'),
        hourlyRate: Joi.number().min(10).max(1000),
        taxRate: Joi.number().min(0).max(100),
    });
    return schema.validate(data);
};

exports.siteValidation = (data) => {
    const postalCodePattern = /^[A-Za-z][0-9][A-Za-z]\s?[0-9][A-Za-z][0-9]$/;
    const provincePattern = /^(AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT)$/;

    const schema = Joi.object({
        name: Joi.string()
            .max(128)
            .regex(alphanumericPattern)
            .message('No special characters allowed for site name.')
            .required(),
        address: {
            street: Joi.string()
                .max(256)
                .regex(alphanumericPattern)
                .message('No special characters allowed street name.')
                .required(),
            postalCode: Joi.string()
                .regex(postalCodePattern)
                .message('Invalid postal code.')
                .required(),
            city: Joi.string().max(64).required(),
            province: Joi.string()
                .regex(provincePattern)
                .message('Invalid province.')
                .required(),
        },
    });
    return schema.validate(data);
};

exports.passwordResetValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string().min(8).max(128).required(),
    });
    return schema.validate(data);
};
