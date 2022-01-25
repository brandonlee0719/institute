const bcrypt = require("bcryptjs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

exports.searchModule = async (req, res) => {
    const pgClient = await db.getClient();
    await pgClient.query('BEGIN')

    const { term } = req.body;

    try {

        const searchResponse = await pgClient.query(`/*search*/ select c.id, m.name, c.title
            from class c 
            left join module m on m.id = c.module_id
            where c.highlight like '%${term}%' 
            and c.status = 'A' 
            and m.status = 'A' 
            order by m.sort, c.sort 
            limit 20
            `);

        if (!searchResponse.rowCount) {
            errorMessage.message = "No result found";
            res.status(status.error).send(errorMessage);
        }

        if (searchResponse.rowCount) {

            await pgClient.query('COMMIT')
            res.status(status.success).send(searchResponse.rows);
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
