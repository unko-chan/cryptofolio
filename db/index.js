const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/users', async (req, res) => {
  try {
    console.log('users');
    const allUsers = await pool.query('SELECT * FROM users');
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const username = req.body.username;
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.get('/users/:id/transactions', async (req, res) => {
  console.log('hit transactions');
  try {
    const { id } = req.params;
    const userTransactions = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1',
      [id]
    );
    res.json(userTransactions.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get('/users/:id/balances', async (req, res) => {
  try {
    const { id } = req.params;
    const currencyBalances = await pool.query(
      'SELECT * FROM currency_balance WHERE user_id = $1',
      [id]
    );
    res.json(currencyBalances.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.post('/users/:id/balances', async (req, res) => {
  // console.log(req.body);
  // res.json(req.body);
  const { id } = req.params;
  const { currency_symbol, date_occured, balance } = req.body;
  try {
    await pool.query (
    `INSERT INTO currency_balance (user_id, currency_symbol, date_occured, balance) VALUES ($1, $2, $3, $4)
     `, [id, currency_symbol, date_occured, balance]
    )
    res.send('successful');
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/', function (req, res) {
  res.send('hello oh');
});

app.listen(5432, () => {
  console.log("Server listening on port 5432");
});
