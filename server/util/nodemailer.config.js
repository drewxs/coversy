const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

/** @module nodemailer */

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.CONFIRMATION_USER,
    pass: process.env.CONFIRMATION_PASS,
  },
});

/**
 * Sends an email to the user with a link to confirm their email address.
 *
 * @function
 * @param {String} name - Name of the user
 * @param {String} email - Email of the user
 * @param {String} confirmationCode - Confirmation code for the user
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
 * Sends an email to the user with a link to reset their password.
 *
 * @function
 * @param {String} name - Name of the user
 * @param {String} email - Email of the user
 * @param {String} forgotPasswordCode - Password reset code for the user
 */
exports.sendForgotEmail = (name, email, forgotPasswordCode) => {
  transport
    .sendMail({
      from: name,
      to: email,
      subject: 'Coversy: Password Reset',
      html: `
                <h2>Hi ${name}</h2>
                <a href=${process.env.CLIENT_URL}/resetpassword?code=${forgotPasswordCode}>Reset your password</a>
                </div>
            `,
    })
    .catch((err) => console.log(err));
};
