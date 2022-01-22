const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const Users = require("../controllers/users.controller");

const router = express.Router();


router.get("/auth/user/:id", [authJwt.verifyToken], Users.getUser);


module.exports = router;