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
          username VARCHAR(128) NOT NULL,
          created_date TIMESTAMP,
          modified_date TIMESTAMP
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
  };
  
  require('make-runnable');