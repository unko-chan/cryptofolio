const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users")
    res.json(allUsers.rows)
  } catch (error) {
    console.error(error.message)
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const  { id }  = req.params;
    const username = req.body.username;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username])

    res.json(user.rows[0])
  } catch (error) {
    console.error(error.message)
  }
});

app.get('/transactions', async (req, res) => {
  console.log('does this run')
  try {
    const userTransaction = await pool.query('SELECT * FROM transactions WHERE user_id = 1')

    res.json(userTransaction.rows)
  } catch (error) {
    console.error(error.message)
  }

});

app.get('user/:id/rebalance_settings', async (req, res) => {
  
});

app.post('user/:id/rebalance_settings', async (req, res) => {
  
});

app.listen(5000, () => { 
  console.log("Server listening on port 5000")
})