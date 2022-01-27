const bcrypt = require("bcryptjs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAccordianMenu = async (req, res) => {
    //  const pgClient = await db.getClient();
    // await pgClient.query('BEGIN')

    try {

        const accordianResponse = await db.query(`/*accordian modules*/ select m.id, m.name, m.sort 
            from module m 
            where m.status = 'A'
            `);

        if (!accordianResponse.rowCount) {
            errorMessage.message = "Client Cannot be registered";
            res.status(status.notfound).send(errorMessage);
        }

        if (accordianResponse.rowCount) {


            const responseData = {
                client: accordianResponse.rows,
            };

            //await pgClient.query('COMMIT')
            res.status(status.success).send(accordianResponse.rows);
        }
    } catch (err) {
        // handle the error
        // await pgClient.query('ROLLBACK')
        console.log('err:', err)
        errorMessage.message = err.message;
        res.status(status.error).send(errorMessage);
    } finally {
        //pgClient.release()
    }
};


const getClassData = async (req, res) => {
    //const pgClient = await db.getClient();
    //await pgClient.query('BEGIN')

    try {

        const accordionClassResponse = await db.query(`/*accordian classes*/ select c.id, c.title, c.type, c.length, c.module_id, c.sort, cc.completion_dt 
            from class c 
            left join client_class cc on cc.class_id = c.id
                and client_id = $1 
            where status='A'
            `, [req.params.id]);

        if (!accordionClassResponse.rowCount) {
            errorMessage.message = "Accordion class data cannot be found.";
            res.status(status.notfound).send(errorMessage);
        }

        if (accordionClassResponse.rowCount) {
            // await pgClient.query('COMMIT')
            res.status(status.success).send(accordionClassResponse.rows);
        }
    } catch (err) {
        // handle the error
        //await pgClient.query('ROLLBACK')
        console.log('err:', err)
        errorMessage.message = err.message;
        res.status(status.error).send(errorMessage);
    } finally {
        // pgClient.release()
    }
};

const accordionFunction = {
    getAccordianMenu,
    getClassData,
};

module.exports = accordionFunction;
