const knex = require('knex');

const knexfile = require('../knexfile');

const db = require('../users/users-model')

module.exports = knex(knexfile.development);