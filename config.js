const config = {}

config.db = {
    connect: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    defaultSchema: 'public'
}

config.server = {
    port: process.env.SERVICE_PORT
}

module.exports = config;