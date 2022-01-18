const express = require("express");
const { authJwt } = require("../middlewares");
const accordionFunction = require("../controllers/accordian.controller");

const router = express.Router();

// auth Routes
router.get(
    "/accordian",
    [authJwt.verifyToken],
    accordionFunction.getAccordianMenu
);

router.get(
    "/classAccordionData/:id",
    [authJwt.verifyToken],
    accordionFunction.getClassData
);

module.exports = router;
