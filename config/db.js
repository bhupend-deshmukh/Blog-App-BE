const db_conection = require("../knexfile")["development"]
const knex = require('knex')(db_conection)

module.exports = knex;
