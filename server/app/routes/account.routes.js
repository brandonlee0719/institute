const express = require("express");
const { authJwt } = require("../middlewares");
const AccountFunction = require("../controllers/account.controller");

const router = express.Router();


router.get(
    "/accountUser/:id",
    [authJwt.verifyToken],
    AccountFunction.getAccountUser
);

router.put(
    "/updateAccountUser",
    [authJwt.verifyToken],
    AccountFunction.updateAccountUser
);

router.delete(
    "/deleteAccountUser/:id",
    [authJwt.verifyToken],
    AccountFunction.deleteAccountUser
);

module.exports = router;


