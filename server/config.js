const dotenv = require("dotenv");

dotenv.config({ debug: true, override: true });

module.exports = {
  port: process.env.PORT || 4100,
  origin: process.env.ORIGIN || `http://localhost:${exports.port}`,
  dbConfig: {
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    database: process.env.DB,
  },
  authSecret: process.env.JWT_SECRET,
  emailConfig: {
    user: process.env.ETHEREAL_EMAIL,
    pass: process.env.ETHEREAL_PASS,
  },
};
