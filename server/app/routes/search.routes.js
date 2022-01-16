const express = require("express");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/search.controller");

const router = express.Router();

// auth Routes
router.post(
    "/searchModule",
    [authJwt.verifyToken],
    controller.searchModule
);

module.exports = router;
