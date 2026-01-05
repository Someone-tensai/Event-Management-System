const {Pool} = require('pg');

const pool  = new Pool({
    user:'postgres',
    host: 'localhost',
    database:'event_management_system',
    password: 'sulav',
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection failed:', err.stack);
  } else {
    console.log('Connected! Current time:', res.rows[0].now);
  }
  pool.end(); // close the connection pool
});