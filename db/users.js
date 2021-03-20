const { Pool, Client } = require('pg')
const pool = require('./db')

pool.query('SELECT * FROM users', (err, res) => {
  console.log(err, res.rows)
  pool.end()
})
