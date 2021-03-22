const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json());

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

app.get('user/:id/rebalance_settings', async (req, res) => {});

app.post('user/:id/rebalance_settings', async (req, res) => {});

app.post('transactions', async (req, res) => {});

app.post('user/:id/balances', async (req, res) => {});

app.get('/', function (req, res) {
  res.send('hello oh');
});

app.listen(5432, () => {
  console.log('Server listening on port 5432');
});

// 1, 'BTC', '2020-03-18', 0.00229664)
app.post('user/:id/balances', async (req, res) => {
  try {
    pool.query(
      'INSERT INTO currency_balance (user_id, currency_symbol, date_occured, balance) VALUES ($1, $2, $3, $4)',
      [user_id, currency_symbol, date_occured, balance]
    );
    console.log('test');
  } catch (error) {
    console.error(error.message);
  }
});
