const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const IndexController = require("../controllers/index.controller");

const router = express.Router();

router.get("/auth/user", [authJwt.verifyToken], IndexController.getUser);
router.get("/auth/client", [authJwt.verifyToken], IndexController.getClient);
router.get(
  "/auth/user/contracts",
  [authJwt.verifyToken],
  IndexController.getUserContracts
);


module.exports = router;
