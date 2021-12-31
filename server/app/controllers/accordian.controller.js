const bcrypt = require("bcryptjs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

exports.getAccordianMenu = async (req, res) => {
    const pgClient = await db.getClient();
    await pgClient.query('BEGIN')

    try {
        // select m.id, m.name, m.sort
        // from module m
        // where m.status = 'A'
        const accordianResponse = await pgClient.query(`SELECT m.id, m.name, m.sort FROM module m WHERE m.status = 'A'`);


        if (!accordianResponse.rowCount) {
            errorMessage.message = "Client Cannot be registered";
            res.status(status.notfound).send(errorMessage);
        }

        if (accordianResponse.rowCount) {


            const responseData = {
                client: accordianResponse.rows,
            };

            await pgClient.query('COMMIT')
            res.status(status.success).send(accordianResponse.rows);
        }
    } catch (err) {
        // handle the error
        await pgClient.query('ROLLBACK')
        console.log('err:', err)
        errorMessage.message = err.message;
        res.status(status.error).send(errorMessage);
    } finally {
        pgClient.release()
    }
};
