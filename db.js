const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'maintenance_db',
  password: 'nopmon0112',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};