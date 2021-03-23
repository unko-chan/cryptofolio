const cryptocurrencies = require('cryptocurrencies');
const axios = require('axios');
// import { getCurrencyPricingData } from './CurrencyPricings';
// const { getCurrencyPricingData } = require('./CurrencyPricings');

// period input must be specified as strings
// "year", "month", "week"

const getUserTransactions = function(user_id) {
   return axios.get('http://localhost:5432/users/1/transactions')
      .then(transactions => transactions.data.filter(transaction => transaction.user_id === user_id));
};

const getCurrencyPricingData = function(currency) {
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

// to find the native amont of each currency:
// 1) iterate through each of the currencies 
// 2) use the date_occurred and currency_symbol to find the pricing of that currency
// - use getCurrencyPricingData
// 3) create a new key for each iterated object; native amount with currency and amount

const getCurrencies = function(userTransactions) {
   // return getUserTransactions(user_id)
   //    .then(userTransactions => {
   let currencies = [];
   for (const transaction of userTransactions) {
      if (!currencies.includes(transaction.currency_symbol)) {
         currencies.push(transaction.currency_symbol);
      }
   }
   return currencies;
      // });
};

// input currencies output promises
// const getCurrencyPrices = function(currencies) {
//    return Promise.all(currencies.map(currency => getCurrencyPricingData(currency)));
// };

// const mapTransactionsWithNativeAmount = function(userTransactions, currencies, currencyPrices) {
//    // return Promise.all([userTransactions, currencies, currencyPrices])
//    //    .then(res => {
//    //       const [userTransactions, currencies, currencyPrices] = res;
         
//    // for each transaction. add the native amount
//    return userTransactions.map(transaction => {
//       const index = currencies.indexOf(transaction.currency_symbol);
//       const date = transaction.date_occured.slice(0, 10);
      
//       transaction.native_amount = currencyPrices[index][date] * transaction.amount;
//       // console.log(transaction);
//       return transaction;
//    });
//    // });
// };

// const currencyPromises = getCurrencies(1);
// const currencyPricePromises = getCurrencyPrices(currencyPromises);
// currencyPricePromises.then(res => console.log(res));

// const userTransactionPromises = getUserTransactions(1);
// userTransactionPromises.then(res => console.log(res));
// mapTransactionsWithNativeAmount(userTransactionPromises, currencyPromises, currencyPricePromises).then(res => console.log(res));


// assume that the transactions include all currencies
const findTransactions = function(transactions, period) {
  return transactions.filter(transaction => checkTransaction(transaction, period));
};

const checkTransaction = function(transaction, period) {
  const date = new Date(transaction.date_occured);
  const periodDays = getPeriodDays(period);
  date.setDate(date.getDate() + periodDays);
  return date > Date.now();
};

// generic period not pertaining to a particular month or year
const getPeriodDays = function(period) {
  switch(period) {
    case "year":
      return 365;
    case "month":
      return 30;
    case "week":
      return 7;
    case "day":
      return 1;
  }
};

const findTransactionAmount = function(transaction) {
   switch(transaction.transaction_type) {
      case "Sent":
         return transaction.native_amount * -1;
      case "Bought":
         return transaction.native_amount;
   }
};

const findTransactionSum = function(transactions) {
  return transactions.reduce((accum, transaction) => {
   //   console.log(transaction);
     return accum + findTransactionAmount(transaction);
  }, 0);
};

const calculateDollarGrowth = function(period, transactions) {
  const periodTransactions = findTransactions(transactions, period);
  return findTransactionSum(periodTransactions).toFixed(2);
};

const calculatePercentGrowth = function(period, transactions) {
  const transactionTotal = findTransactionSum(transactions);
  const periodTotal = calculateDollarGrowth(period, transactions);

  const previousPeriodTotal = transactionTotal - periodTotal;
  if (previousPeriodTotal < 1) return "🚀";

  console.log(previousPeriodTotal);

  const periodIncrease = (periodTotal / previousPeriodTotal * 100).toFixed(2);
  return periodIncrease;
};

const findCurrencyTransactions = function(transactions, currency) {
   return transactions.filter(transaction => transaction.currency_symbol === currency);
};

const findCurrencyPercentGrowth = function(transactions, currency, period) {
   const currencyTransactions = findCurrencyTransactions(transactions, currency);
   const currencyPercentGrowth = calculatePercentGrowth(period, currencyTransactions);
   return currencyPercentGrowth;
};

// to find the portofolio holding over the user's entire history
// need to find their first transaction date
// then tally up til now

Date.prototype.addDays = function(days) {
   const date = new Date(this.valueOf());
   date.setDate(date.getDate() + days);
   return date;
};

const getDates = function(startDate, stopDate) {
   let dateArray = [];
   let currentDate = startDate;
   while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = currentDate.addDays(1);
   }
   return dateArray;
};

// const populatePortfolioDates = function(transactions) {
//    let startDate = new Date(sortTransactions(transactions)[0].date_occured);
//    return getDates(startDate, Date.now());
// };

// starting from the earliests
const sortTransactions = function(transactions) {
   return transactions.sort((a, b) => new Date(a.date_occured) - new Date(b.date_occured));
};

// const findAllTransactionDates = function(transactions) {
//    return transactions.map(transaction => new Date(transaction.date_occured));
// };

// const findDailyChanges = function(transactions, date) {
//    return transactions
//       .filter(transaction => transaction.date_occured === date)
//       .reduce((accum, transaction) => accum + Number(transaction.native_amount.amount), 0);
// };

const findPortofolioHistory = function(transactions) {
   const sortedTransactions = sortTransactions(transactions);
   const startDate = new Date(sortedTransactions[0].date_occured);
   const allDates = getDates(startDate, Date.now());

   // const allTransactionDates = findAllTransactionDates(transactions);

   let balance = 0;
   let history = {};

   // for (const date of allDates) {
   //    if (allTransactionDates.includes(new Date(date))) {
   //       console.log('this is working!');
   //       const dailyChanges = findDailyChanges(transactions, date);         
   //       balance += dailyChanges;
   //    }
   //    history[date] = balance;
   // }

   for (const transaction of sortedTransactions) {
      const date = new Date(transaction.date_occured);
      balance += Number(transaction.native_amount);
      history[date] = balance;
   };
   
   let tempBalance = sortedTransactions[0].native_amount;
   for (const date of allDates) {
      if (!history[date]) {
         console.log('this');
         history[date] = tempBalance;
      } else {
         tempBalance = history[date];
      }
   }

   return history;
};

// const bitCoinOneMonthGrowth = findCurrencyPercentGrowth("BTC", "month");
// console.log(bitCoinOneMonthGrowth);
const fullCurrencyName = (currencyName) => {
   if (cryptocurrencies[currencyName]) {
      return cryptocurrencies[currencyName]
   } else {
      return currencyName;
   }
};

// console.log("year", getPeriodDays("year"));
// console.log("month", getPeriodDays("month"));
// console.log(checkTransaction(transaction, "month"));

// const ETHOneMonthGrowth = findCurrencyPercentGrowth("ETH", "week");
// console.log(ETHOneMonthGrowth);

// console.log(findPortofolioHistory(transactions));
// console.log("2021-03-15T08:10:13Z".slice(0,10));

// console.log(getDates(new Date("2021-03-15T08:10:13Z".slice(0,10)), Date.now()));

// console.log(findAllTransactionDates(transactions));
// const allDates = getDates(new Date("2015-03-11T20:13:35.000Z"), Date.now());
// console.log(allDates);
// console.log(Date.now());
// console.log(allDates.find(Date.now()));

// console.log(findDailyChanges(transactions, '2021-03-11T13:13:35-07:00'));

export {
  findTransactions,
  findTransactionSum,
  calculateDollarGrowth,
  calculatePercentGrowth,
  fullCurrencyName,
  findCurrencyPercentGrowth,
  getUserTransactions,
  getCurrencies,
//   getCurrencyPrices,
//   mapTransactionsWithNativeAmount
};
