const pgp = require('pg-promise')();

// const db = pgp({
//     user: 'mhrezptctpbrwz',
//     password: '09c8f06e95b9fd997bf96c1b9c6ecfef0fa306fde17a8ab86f89674678809162',
//     host: 'ec2-3-225-213-67.compute-1.amazonaws.com',
//     port: 5432,
//     database: 'dar7fsa1pgcgua',
//     ssl: { rejectUnauthorized: false }
// });

const db = pgp({
    user: 'ehco',
    password: 'ehco123',
    host: 'localhost',
    port: 5432,
    database: 'dbmd',
    // ssl: { rejectUnauthorized: false }
});

module.exports = db;