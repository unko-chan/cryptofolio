const prices = require('../walletData/btcPrices.json');
const balances = require('../walletData/btcData.json');
// // import moment from 'moment';

// const moment = require('moment');

const axios = require('axios');

const getCurrencyPricingData = function(currency) {
  const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${currency}&market=CAD&apikey=${process.env.REACT_ALPHA_VANTAGE_KEY}`;
  return axios.get(url)
    .then(res => {
      const data = res.data["Time Series (Digital Currency Daily)"];
      
      let prices = {};

      for (const date in data) {
        prices[date] = data[date]['4a. close (CAD)']; 
      }

      return prices;
    });
};

// convert balance time series into the native amount
// prices are arranged in descneding from recent to oldest
// balances are arranged in ascending order from oldest to the most recent
const convertCurrencyOwnings = function(prices, balances) {
  const currencyOwnings = {};
  let previousBalanceDate = Object.keys(balances)[0]; //set to first date (2020-03-18)

  for (const [date, price] of Object.entries(prices).reverse()) {
    if (new Date(date) < new Date(previousBalanceDate)) {
      continue;
    }

    // check if price date exists in balances
    if (balances[date]) {
      currencyOwnings[date] = price * balances[date];
      previousBalanceDate = date;
    } else {
      // if it doesn't exist
      currencyOwnings[date] = price * balances[previousBalanceDate];
    }
  }

  return currencyOwnings;
}

// getCurrencyPricingData("BTC")
//   .then(prices => console.log(convertCurrencyOwnings(prices, balances)));

const findMinPeriodBalance = function(currencyOwnings, days) {
  let minVal = 100000000;

  const today = new Date();
  const earliestDate = new Date();
  earliestDate.setDate(today.getDate() - days);

  // console.log(earliestDate.toISOString());
  
  for (const date in currencyOwnings) {
    if (new Date(date) >= earliestDate) {
      const owning = currencyOwnings[date];
      if (owning < minVal) {
        minVal = owning;
      }
      // console.log('hello', date);
    }
  };

  return minVal;
};

// console.log(new Date('2021-01-22') < Date.now() - 365);
// const ownings = convertCurrencyOwnings(prices, balances);
// console.log(ownings);
// console.log(findMinPeriodBalance(ownings, 7));

export {
  getCurrencyPricingData, 
  convertCurrencyOwnings, 
  findMinPeriodBalance
};