const bcrypt = require("bcryptjs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");
const { validationResult } = require("express-validator");
const {
    transporter,
    getEmailVerificationURL,
    signUpConfirmationTemplate,
} = require("../helpers/email");

exports.sendEmail = async (req, res) => {
    try {
        const { from, to, subject, message } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errorMessage.message = errors.array();
            return res.status(status.error).send(errorMessage);
        }

        const emailTemplate = {
            from: from,
            to: process.env.TO_EMAIL,
            subject: subject,
            html: message
        };

        // send mail with defined transport object
        const info = await transporter.sendMail(emailTemplate);

        if (info) {
            console.info("Email sent:", info);
            const successMessage = "Email sent successfully";
            res.status(status.success).send(successMessage);
        }
    } catch (error) {
        errorMessage.message = "Could not udpate User";
        res.status(status.error).send(errorMessage);
    }


};
