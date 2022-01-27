const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require('../db')
const config = require("../../config");
const { errorMessage, successMessage, status } = require("../helpers/status");

/**
 * This function let user to signin into the system.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.signin = async (req, res) => {

  const response = await db.query(`select id, password from client where email = $1`, [req.body.email]);

  const user = response.rows[0];

  if (!user) {
    errorMessage.message = "User not found";
    errorMessage.user = user;
    return res.status(status.notfound).send(errorMessage);
  }

  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordValid) {
    errorMessage.message = "Wrong password!";
    errorMessage.user = user;
    return res.status(status.unauthorized).send(errorMessage);
  }

  // update user login_dt
  await db.query(`UPDATE client SET login_dt=now() WHERE id=$1`, [user.id]);

  const token = jwt.sign(
    { id: user.id, role: "CLIENT" },
    config.authSecret,
    {
      expiresIn: 86400, // 24 hours
    }
  );
  const resData = {};
  resData.accessToken = token;
  delete user.password; // delete password from response
  resData.user = user;
  resData.user.role = "CLIENT";
  resData.user.login_url = `/login_client`;
  successMessage.data = resData;
  res.status(status.success).send(successMessage);
};
