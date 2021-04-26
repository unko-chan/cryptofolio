// import React from 'react';

const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h';

const axios = require('axios');

const createData = function (number, name, price, change, marketCap, symbol) {
  return { number, name, price, change, marketCap, symbol }
};

axios.get(url)
  .then(res => {
    const rows = res.data.map((currency, index) => {
      const { name, current_price, price_change_percentage_1h_in_currency, market_cap, symbol } = currency;
      createData(index, name, current_price, price_change_percentage_1h_in_currency, market_cap, symbol);
    })
  });