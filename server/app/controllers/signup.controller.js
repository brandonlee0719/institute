const bcrypt = require("bcryptjs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");


/**
 * This function validate the records value in database.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.fieldValiate = async (req, res) => {
  if (!req.body.fieldName && !req.body.value) {
    errorMessage.message = "body content must be provided!";
    return res.status(status.error).send(errorMessage);
  }
  let tableName = "client"; // By default let if look into client table

  try {
    const selectResponse = await db.query(
      `SELECT id, ${req.body.fieldName} FROM ${tableName} WHERE ${req.body.fieldName} = $1`,
      [req.body.value]
    );
    if (selectResponse.rows.length > 0) {
      errorMessage.message = {
        value: req.body.value,
        msg: `${req.body.value} already taken.`,
        param: `${tableName}.${req.body.fieldName}`,
      };
      return res.status(status.success).send(errorMessage);
    }
    successMessage.message = {
      value: req.body.value,
      msg: `${req.body.value} can be used.`,
      param: `${tableName}.${req.body.fieldName}`,
    };
    res.status(status.success).send(successMessage);
  } catch (error) {
    return res.status(status.notfound).send(JSON.stringify(error));
  }
};

/**
 * This function let client and user to signup into the system.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.signup = async (req, res) => {
  // const pgClient = await db.getClient();
  // await pgClient.query('BEGIN')


  const { user } = req.body;
  user.password = bcrypt.hashSync(user.password, 8);
  user.created = new Date();
  user.login_dt = new Date();

  const forwarded = req.headers["x-forwarded-for"];
  const userIP = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;
  // TODO: for localhost ::1 might be taken. Need further test
  user.ipAddress = userIP;

  // `SELECT id, ${req.body.fieldName} FROM ${tableName} WHERE ${req.body.fieldName} = $1`,
  //     [req.body.value]
  //   );
  const existingEmailRows = await db.query(
    `SELECT id FROM client WHERE email=$1`,
    [req.body.email]
  );

  if (existingEmailRows.length > 0) {
    errorMessage.message = [
      {
        value: JSON.stringify(user.email),
        msg: "Email is already in our system. Try with different values",
        param: "user.body",
      },
    ];
    return res.status(status.error).send(errorMessage);
  }

  try {

    const clientResponse = await db.query(`INSERT INTO client(firstname, lastname, license, email, password, ip_address, reset_password_token, reset_password_expires, login_dt, unsubscribe_dt, created) 
    VALUES ('${user.firstname}', '${user.lastname}', '${user.license}', '${user.email}', '${user.password}', '${user.ipAddress}', null, null, now(), null, now()) RETURNING id`);

    if (!clientResponse.rowCount) {
      errorMessage.message = "Client Cannot be registered";
      res.status(status.notfound).send(errorMessage);
    }

    if (clientResponse.rowCount) {

      successMessage.message = "User succesfullly registered!";
      const responseData = {
        client: clientResponse.rows[0],
      };

      //await pgClient.query('COMMIT')
      res.status(status.created).send(responseData);
    }
  } catch (err) {
    // handle the error
    // await pgClient.query('ROLLBACK')
    console.log('err:', err)
    errorMessage.message = err.message;
    res.status(status.error).send(errorMessage);
  } finally {
    // pgClient.release()
  }
};
