const express = require("express");
const { authJwt } = require("../middlewares");
const emailController = require("../controllers/email.controller");

const router = express.Router();


router.post(
    "/sendEmail",
    [authJwt.verifyToken],
    emailController.sendEmail
);

module.exports = router;


