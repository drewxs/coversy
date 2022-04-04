const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.CONFIRMATION_USER,
        pass: process.env.CONFIRMATION_PASS,
    },
});

/**
 * Sends an email to the user with a link to confirm their email address
 * @param {*} name
 * @param {*} email
 * @param {*} confirmationCode
 */
exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport
        .sendMail({
            from: name,
            to: email,
            subject: 'Coversy: Please confirm your account',
            html: `
                <h2>Hi ${name}</h2>
                <p>Please confirm your email by clicking on the following link</p>
                <a href=${process.env.CLIENT_URL}/confirm?code=${confirmationCode}> Click here</a>
                </div>
            `,
        })
        .catch((err) => console.log(err));
};

/**
 * Sends an email to the user with a link to reset their password
 * @param {*} name
 * @param {*} email
 * @param {*} forgotPasswordCode
 */
exports.sendForgotEmail = (name, email, forgotPasswordCode) => {
    transport
        .sendMail({
            from: name,
            to: email,
            subject: 'Coversy: Password Reset',
            html: `
                <h2>Hi ${name}</h2>
                <a href=${process.env.CLIENT_URL}/forgotpassword?code=${forgotPasswordCode}>Reset your password</a>
                </div>
            `,
        })
        .catch((err) => console.log(err));
};
