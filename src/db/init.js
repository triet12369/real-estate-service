// Init database
// Connect to configured postgres instance
// Try to create database if not exists
const config = require('../../config');
const db = require('./index');
const error = require('../error');
const { ERROR_TYPES } = require('../constants');

const REQUIRED_TABLES = [
    {
        name: 'user',
        schema: `
            id SERIAL,
            username TEXT,
            user_password TEXT,
            PRIMARY KEY (id)
        `
    },
    {
        name: 'access_token',
        schema: `
            id SERIAL,
            access_token TEXT,
            user_id INTEGER,
            PRIMARY KEY (id)
        `
    },
    {
        name: 'property',
        schema: ``
    },
    {
        name: 'property_image',
        schema: ``
    }
]


function createTables() {
    return Promise.allSettled(REQUIRED_TABLES.map((table) => {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${config.db.defaultSchema}.${table.name}
        (
            ${table.schema}
        )
        
        WITH (
            OIDS = FALSE
        );
        
        ALTER TABLE ${config.db.defaultSchema}.${table.name}
            OWNER to ${config.db.connect.user};
        `
        return db.query(createTableQuery);
    }));
}

function checkTableExist(table) {
    const queryTableExist = `
    SELECT EXISTS
    (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = '${config.db.defaultSchema}'
        AND table_name = '${table}'
    )` 
    return db.query(queryTableExist);
}

async function checkAllRequiredTableExists() {
    let result = 0;
    const responses = await Promise.allSettled(REQUIRED_TABLES.map((table) => checkTableExist(table.name)));
    responses.forEach((res, index) => {
        if (res.status != 'fulfilled') {
            error(ERROR_TYPES.INIT, 'Query failure');
            result = 1;
            return result;
        }
        const firstRow = res.value.rows[0];
        // console.log(res.value);
        if (firstRow && !firstRow.exists) {
            error(ERROR_TYPES.INIT, `Table ${REQUIRED_TABLES[index].name} does not exist`);
            result = 1;
            return result;
        }
    })
    return result;
}

async function resetPublicSchema() {
    return db.query(
        `
        DROP SCHEMA public CASCADE;
        CREATE SCHEMA public;
        GRANT ALL ON SCHEMA public TO postgres;
        GRANT ALL ON SCHEMA public TO public;
        COMMENT ON SCHEMA public IS 'standard public schema';
        `
    );
}

async function dbInit () {
    console.log("Start initializing database instance...");
    // console.log("Config db", config.db);
    let exitCode = 0;

    const reset = process.env.RESET === 'true';
    if (reset) {
        // clean everything and create new table
        console.log('Database reset...');
        try {
            await resetPublicSchema();
            await createTables();
            exitCode = await checkAllRequiredTableExists();
        } catch (err) {
            exitCode = 1;
            error(ERROR_TYPES.RESET, err);
        }
    } else {
        // checks if every tables are there
        console.log('Checking tables...');
        exitCode = await checkAllRequiredTableExists();
    }
    return exitCode;
}

module.exports = dbInit;