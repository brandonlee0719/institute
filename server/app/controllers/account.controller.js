const bcrypt = require("bcryptjs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAccountUser = async (req, res) => {
    // const pgClient = await db.getClient();
    //  await pgClient.query('BEGIN')

    try {

        const accountUserResponse = await db.query(`/*account*/ select firstname, lastname, email, license 
            from client 
            where id = $1
            `, [req.params.id]);

        if (!accountUserResponse.rowCount) {
            errorMessage.message = "Could not fetch client";
            res.status(status.notfound).send(errorMessage);
        }

        if (accountUserResponse.rowCount) {
            // await pgClient.query('COMMIT')
            res.status(status.success).send(accountUserResponse.rows[0]);
        }
    } catch (err) {
        // handle the error
        //await pgClient.query('ROLLBACK')
        console.log('err:', err)
        errorMessage.message = err.message;
        res.status(status.error).send(errorMessage);
    } finally {
        //pgClient.release()
    }
};

const updateAccountUser = async (req, res) => {
    // const pgClient = await db.getClient();
    //await pgClient.query('BEGIN')

    const { firstname, lastname, email, license, password, id } = req.body;
    //user.password = bcrypt.hashSync(user.password, 8);
    try {
        const updateResponse = await db.query(`/*account*/ update client 
            set firstname = '${firstname}', lastname = '${lastname}' , license = '${license}', email = '${email}', password = '${bcrypt.hashSync(password, 8)}' 
            where id = '${id}'
            `);

        if (!updateResponse.rowCount) {
            errorMessage.message = "Could not udpate User";
            res.status(status.error).send(errorMessage);
        }

        if (updateResponse.rowCount) {
            const successMessage = "Successfully Updated"
            // await pgClient.query('COMMIT')
            res.status(status.success).send(successMessage);
        }

        // await pgClient.query('COMMIT')
        res.status(status.success).send(successMessage);

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

const deleteAccountUser = async (req, res) => {
    // const pgClient = await db.getClient();
    //await pgClient.query('BEGIN')

    const { id } = req.params;
    try {

        await db.query(`DELETE FROM client_class WHERE client_id = ${id} `);
        await db.query(`DELETE FROM client WHERE id = ${id} `);

        const successMessage = "User Deleted Successfully";

        // await pgClient.query('COMMIT')
        res.status(status.success).send(successMessage);

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

const AccountFunction = {
    getAccountUser,
    updateAccountUser,
    deleteAccountUser
};

module.exports = AccountFunction;