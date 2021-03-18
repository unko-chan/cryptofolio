const cryptocurrencies = require('cryptocurrencies');
const transactions = [
  {
     "type" : "send",
     "details" : {
        "subtitle" : "From Kevin Liang",
        "health" : "positive",
        "header" : "Received 0.00066265 BTC ($49.97)",
        "title" : "Received Bitcoin"
     },
     "off_chain_status" : "completed",
     "resource_path" : "/v2/accounts/063d32b5-3ea0-58fd-a3d6-e40bfefeee1c/transactions/f52fec7c-62a4-5d8e-ae48-6984f1d4cf57",
     "description" : null,
     "amount" : {
        "currency" : "BTC",
        "amount" : "0.00066265"
     },
     "network" : {
        "status_description" : null,
        "status" : "off_blockchain"
     },
     "updated_at" : "2021-03-14T08:10:13Z",
     "id" : "f52fec7c-62a4-5d8e-ae48-6984f1d4cf57",
     "created_at" : "2021-03-14T08:10:13Z",
     "from" : {
        "id" : "c708062e-d621-51a6-86bf-6d451526b254",
        "currency" : "BTC",
        "resource" : "user",
        "resource_path" : "/v2/users/c708062e-d621-51a6-86bf-6d451526b254"
     },
     "instant_exchange" : false,
     "status" : "completed",
     "resource" : "transaction",
     "native_amount" : {
        "currency" : "CAD",
        "amount" : "49.97"
     }
  },
  {
     "updated_at" : "2021-03-12T21:13:18Z",
     "id" : "4c6d2668-7acb-52fb-b227-8164ad4335e5",
     "created_at" : "2021-03-12T21:13:04Z",
     "instant_exchange" : false,
     "status" : "completed",
     "resource" : "transaction",
     "native_amount" : {
        "amount" : "2.00",
        "currency" : "CAD"
     },
     "buy" : {
        "resource_path" : "/v2/accounts/063d32b5-3ea0-58fd-a3d6-e40bfefeee1c/buys/b092ff0b-6729-5080-87ba-32d7a8039811",
        "resource" : "buy",
        "id" : "b092ff0b-6729-5080-87ba-32d7a8039811"
     },
     "type" : "buy",
     "details" : {
        "header" : "Bought 0.00001425 BTC ($2.00)",
        "title" : "Bought Bitcoin",
        "subtitle" : "Using 4506********1976",
        "health" : "positive",
        "payment_method_name" : "4506********1976"
     },
     "resource_path" : "/v2/accounts/063d32b5-3ea0-58fd-a3d6-e40bfefeee1c/transactions/4c6d2668-7acb-52fb-b227-8164ad4335e5",
     "amount" : {
        "amount" : "0.00001425",
        "currency" : "BTC"
     },
     "description" : null
  },
  {
      "id": "57ffb4ae-0c59-5430-bcd3-3f98f797a66c",
      "type": "send",
      "status": "completed",
      "amount": {
         "amount": "0.0032",
         "currency": "ETH"
      },
      "native_amount": {
         "amount": "56.90",
         "currency": "CAD"
      },
      "description": null,
      "created_at": "2020-12-11T13:13:35-07:00",
      "updated_at": "2020-12-11T15:55:43-07:00",
      "resource": "transaction",
      "resource_path": "/v2/accounts/2bbf394c-193b-5b2a-9155-3b4732659ede/transactions/57ffb4ae-0c59-5430-bcd3-3f98f797a66c",
      "network": {
         "status": "off_blockchain",
         "name": "bitcoin"
      },
      "to": {
         "id": "a6b4c2df-a62c-5d68-822a-dd4e2102e703",
         "resource": "user",
         "resource_path": "/v2/users/a6b4c2df-a62c-5d68-822a-dd4e2102e703"
      },
      "details": {
         "title": "Send bitcoin",
         "subtitle": "to User 2"
      }
  },
  {
      "id": "57ffb4ae-0c59-5430-bcd3-3f98f797a66c",
      "type": "send",
      "status": "completed",
      "amount": {
         "amount": "0.00500000",
         "currency": "BTC"
      },
      "native_amount": {
         "amount": "25.65",
         "currency": "CAD"
      },
      "description": null,
      "created_at": "2015-03-11T13:13:35-07:00",
      "updated_at": "2015-03-26T15:55:43-07:00",
      "resource": "transaction",
      "resource_path": "/v2/accounts/2bbf394c-193b-5b2a-9155-3b4732659ede/transactions/57ffb4ae-0c59-5430-bcd3-3f98f797a66c",
      "network": {
         "status": "off_blockchain",
         "name": "bitcoin"
      },
      "to": {
         "id": "a6b4c2df-a62c-5d68-822a-dd4e2102e703",
         "resource": "user",
         "resource_path": "/v2/users/a6b4c2df-a62c-5d68-822a-dd4e2102e703"
      },
      "details": {
         "title": "Send bitcoin",
         "subtitle": "to User 2"
      }
  }
];

const transaction = {
  "created_at": "2021-03-12T21:13:04Z"
};

// assume that the transactions include all currencies
const findTransactions = function(transactions, period) {
  return transactions.filter(transaction => checkTransaction(transaction, period));
};

const checkTransaction = function(transaction, period) {
  const date = new Date(transaction.created_at);
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

const findTransactionAmount = function(transactions) {
  return transactions.reduce((accum, cur) => accum + Number(cur.native_amount.amount), 0);
};

const calculateDollarGrowth = function(period, transactions) {
  const periodTransactions = findTransactions(transactions, period);
  return findTransactionAmount(periodTransactions);
};

const calculatePercentGrowth = function(period, transactions) {
  const transactionTotal = findTransactionAmount(transactions);
  const periodTotal = calculateDollarGrowth(period, transactions);
  // console.log('this is period total', period, periodTotal);
  const previousPeriodTotal = transactionTotal - periodTotal;
  if (previousPeriodTotal === 0) {
    return "🚀";
  }
  // console.log('this is previous period total', period, previousPeriodTotal);
  const periodIncrease = (periodTotal / previousPeriodTotal * 100).toFixed(2);
  return periodIncrease;
};

const fullCurrencyName = (currencyName) => {
  return cryptocurrencies[currencyName]
 };

// console.log("year", getPeriodDays("year"));
// console.log("month", getPeriodDays("month"));
// console.log(checkTransaction(transaction, "month"));

// const monthlyTransactions = findTransactions(transactions, "month");
// console.log('monthly transactions', monthlyTransactions);

// const total = findTransactionAmount(monthlyTransactions);
// console.log(total);

// find monthly growth amount and percentage
// const monthlyPercentGrowth = calculatePercentGrowth("month", transactions);
// console.log(monthlyPercentGrowth);

// // find yearly growth amount and percentage
// const yearlyPercentGrowth = calculatePercentGrowth("year", transactions);
// console.log(yearlyPercentGrowth);

// // find weekly growth amount and percentage
// const weeklyDollarGrowth = calculateDollarGrowth("week", transactions);
// const weeklyPercentGrowth = calculatePercentGrowth("week", transactions);

export { findTransactions, findTransactionAmount, calculateDollarGrowth, calculatePercentGrowth, fullCurrencyName };