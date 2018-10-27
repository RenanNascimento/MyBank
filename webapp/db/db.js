const pg = require('pg')

const POSTGRES_HOST     = process.env.POSTGRES_HOST
const POSTGRES_PORT     = process.env.POSTGRES_PORT
const POSTGRES_USER     = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DB       = process.env.POSTGRES_DB

const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`

const pgClient = new pg.Client({
  connectionString: connectionString,
})

console.log("Connecting with Postgres...")
pgClient.connect()

module.exports = pgClient