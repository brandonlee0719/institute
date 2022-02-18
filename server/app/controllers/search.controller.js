const bcrypt = require("bcryptjs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

exports.searchModule = async (req, res) => {
    //const pgClient = await db.getClient();
    //await pgClient.query('BEGIN')

    var { term } = req.body; // const to var David Feb 17 2021
    term = term.toLowerCase(); // David Feb 17 2021

    try {

        const searchResponse = await db.query(`/*search page*/ select c.id, m.name, c.title 
            from class c 
            left join module m on m.id = c.module_id
            where (lower(c.highlight) like '%${term}%' or lower(c.title) like '%${term}%')
            and c.status = 'A' 
            and m.status = 'A' 
            order by m.sort, c.sort 
            limit 40
            `);

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
