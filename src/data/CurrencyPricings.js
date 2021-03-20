const prices = require('../walletData/btcPrices.json');
const ltcData = require('../walletData/ltcData.json');
const btcData = require('../walletData/btcData.json');
const ethData = require('../walletData/ethData.json');
// // import moment from 'moment';

// const moment = require('moment');

const axios = require('axios');

const getCurrencyPricingData = function (currency) {
  const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${currency}&market=CAD&apikey=${process.env.REACT_ALPHA_VANTAGE_KEY}`;
  return axios.get(url).then((res) => {
    const data = res.data['Time Series (Digital Currency Daily)'];

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
const convertCurrencyOwnings = function (prices, balances) {
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
};

/* 
  1) get all currencies ['BTC', 'ETH', 'LTC'];
  
  2) get time series prices of those currencies
      - call getCurrencyPricingData() for each currency
      
  3) convert currency to native owning for each currency
      -call convertCurrencyOwnings(prices, balances) for eachcurrency currency

  4) sum native ownings
*/

/*
allCurrencyOwnings = 
[
  "BTC" : {
    date: cad
  },

  "ETH" : {
    date: cad
  },
]
*/

const getCurrencyBalance = function (currency) {
  switch (currency) {
    case 'BTC':
      return btcData;
    case 'LTC':
      return ltcData;
    case 'ETH':
      return ethData;
  }
};

const allCurrencies = ['BTC', 'ETH', 'LTC'];

const findAllCurrencyOwnings = function (currencies) {
  return Promise.all(currencies.map((currency) => {
    //historical pricing of currency
      return getCurrencyPricingData(currency).then((prices) => {
        //get wallet crypto balance
        const balances = getCurrencyBalance(currency);
        const convertedCurrencyOwnings = convertCurrencyOwnings(prices, balances);

        return convertedCurrencyOwnings;
      });
    }))
    .then((res) => res)
    .catch((e) => {
        console.log(e);
    });
};

// console.log(getCurrencyBalance('ETH'));
// findAllCurrencyOwnings(allCurrencies);

const sumAllOwnings = function (data) {
  return findAllCurrencyOwnings(data).then((currencyValues) => {

    console.log('currencyValues', currencyValues);

    let maxLengthIndex;
    let maxLength = 0;

    for (const [index, values] of currencyValues.entries()) {
      if (Object.keys(values).length > maxLength) {
        maxLength = Object.keys(values).length;
        maxLengthIndex = index;
      }
    }

    console.log('maxLengthIndex is', maxLengthIndex);

    const summedOwnings = { ...currencyValues[maxLengthIndex] };

    for (const [index, values] of currencyValues.entries()) {
      if (index !== maxLengthIndex) {
        console.log('index is ', index);
        for (const [date, amount] of Object.entries(values)) {
          summedOwnings[date] += amount;
        }
      }
    }
    console.log(summedOwnings);
    return summedOwnings;
  });
};

sumAllOwnings(allCurrencies);

// [
//   {
//
//       '2020-03-18': 15.482339232000001,
//
//   },
//   {
//
//       '2020-03-18': 15.482339232000001,
//
//   },
// ];

// {
//   "BTC: {
//     '2020-03-18': 15.482339232000001,
//   }
// }

// getCurrencyPricingData("BTC")
//   .then(prices => console.log(convertCurrencyOwnings(prices, balances)));

const findMinPeriodBalance = function (currencyOwnings, days) {
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
  }

  return minVal;
};

// console.log(new Date('2021-01-22') < Date.now() - 365);
// const ownings = convertCurrencyOwnings(prices, balances);
// console.log(ownings);
// console.log(findMinPeriodBalance(ownings, 7));

// export {
//   getCurrencyPricingData,
//   convertCurrencyOwnings,
//   findMinPeriodBalance,
//   sumAllOwnings,
// };
