'use strict';

var _require = require('pg'),
    Pool = _require.Pool;

var dontenv = require('dotenv');

dontenv.config();

var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', function () {
  console.log('connected to the db');
});

var createuserTables = function createuserTables() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      users(\n        id SERIAL PRIMARY KEY NOT NULL,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        password VARCHAR(128) NOT NULL,\n        firstname VARCHAR(128) NOT NULL,\n        lastname VARCHAR(128) NOT NULL,\n        username VARCHAR(128) NOT NULL\n      )';

  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

var createIncident = function createIncident() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      incidents(\n        id SERIAL PRIMARY KEY NOT NULL,\n        type VARCHAR(128) NOT NULL,\n        comment VARCHAR(128) NOT NULL,\n        location VARCHAR(128) NOT NULL,\n        status VARCHAR(128) DEFAULT \'draft\',\n        images TEXT[],\n        videos TEXT[],\n        createdBy INTEGER NOT NULL,\n        createdOn VARCHAR(128) NOT NULL,\n        FOREIGN KEY(createdBy) REFERENCES users(id) ON DELETE CASCADE \n      )';

  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

module.exports = {
  createuserTables: createuserTables,
  createIncident: createIncident
};

require('make-runnable');