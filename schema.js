const { Pool } = require('pg');
const dontenv = require('dotenv');

dontenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
  
  pool.on('connect', () => {
    console.log('connected to the db');
  });

