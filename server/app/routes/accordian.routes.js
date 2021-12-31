const express = require("express");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/accordian.controller");

const router = express.Router();

// auth Routes
router.get(
    "/accordian",
    [authJwt.verifyToken],
    controller.getAccordianMenu
);

module.exports = router;
