const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require('../db')
const config = require("../../config");
const { errorMessage, successMessage, status } = require("../helpers/status");



const getUser = async (req, res) => {
    const { id } = req.params;

    const response = await db.query(` select id, password from client where id = '${id}'`);

    const user = response.rows[0];

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



const users = {
    getUser
};

module.exports = users;