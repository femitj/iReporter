const { Pool } = require('pg');
const dontenv = require('dotenv');

dontenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
  
  pool.on('connect', () => {
    console.log('connected to the db');
  });

const createuserTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        username VARCHAR(128) NOT NULL
      )`;

      pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createIncident = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      incidents(
        id SERIAL PRIMARY KEY NOT NULL,
        type VARCHAR(128) NOT NULL,
        comment VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        status VARCHAR(128) DEFAULT 'draft',
        images TEXT[],
        videos TEXT[],
        createdBy INTEGER NOT NULL,
        createdOn VARCHAR(128) NOT NULL,
        FOREIGN KEY(createdBy) REFERENCES users(id) ON DELETE CASCADE 
      )`;

      pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  }

module.exports = {
  createuserTables,
  createIncident
};

require('make-runnable');