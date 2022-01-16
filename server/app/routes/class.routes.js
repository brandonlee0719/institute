const express = require("express");
const { authJwt } = require("../middlewares");
const classController = require("../controllers/class.controller");

const router = express.Router();


router.get(
    "/getClass/:id",
    [authJwt.verifyToken],
    classController.getClass
);

router.post(
    "/updateClassCompletion",
    [authJwt.verifyToken],
    classController.updateClassCompletion
)

module.exports = router;


