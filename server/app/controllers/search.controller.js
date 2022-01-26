const bcrypt = require("bcryptjs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

exports.searchModule = async (req, res) => {
    //const pgClient = await db.getClient();
    //await pgClient.query('BEGIN')

    const { term } = req.body;

    try {


        const searchResponse = await db.query(`SELECT c.id, m.name, c.title FROM class c LEFT JOIN module m on m.id = c.module_id
        WHERE c.highlight like '%${term}%' AND c.status = 'A' AND m.status = 'A' ORDER BY m.sort, c.sort LIMIT 20`);

        if (!searchResponse.rowCount) {
            errorMessage.message = "No result found";
            res.status(status.nocontent).send(errorMessage);
        }

        if (searchResponse.rowCount) {

            //await pgClient.query('COMMIT')
            res.status(status.success).send(searchResponse.rows);
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
