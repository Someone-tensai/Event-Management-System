const {Pool} = require('pg');

const pool  = new Pool({
    user:`${process.env.db_user}`,
    host: 'localhost',
    database:`${process.env.db_name}`,
    password: `${process.env.db_password}`,
    port: 5432,
});

module.exports = pool;
