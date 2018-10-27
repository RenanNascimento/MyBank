const Sequelize = require('sequelize');
const ClientModel = require('../models/client')

const POSTGRES_HOST     = process.env.POSTGRES_HOST
const POSTGRES_PORT     = process.env.POSTGRES_PORT
const POSTGRES_USER     = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DB       = process.env.POSTGRES_DB

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect:'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});
  
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to postgres has been established successfully.');
        console.log('Criating tables...');
        ClientModel(Sequelize, sequelize)
            .sync()
            .then(() => console.log("Client table was created successfully!"))
            .catch(err => console.log(`ERROR creating table Client: ${err}`));
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });

module.exports = sequelize;