const Knex = require('knex');
const { Model } = require('objection');
const KnexConfig = require('../knexfile');

//Knex Configuration
const knex = Knex(KnexConfig);

const initializeDB = function () {
	//Initialize knex Model
	Model.knex(knex);
	console.log('Database Connection Established Successfully');
};

const destroyKnex = async function () {
	await knex.destroy();
	console.log('Database Connection Is Closed');
};

module.exports = { initializeDB, destroyKnex };
