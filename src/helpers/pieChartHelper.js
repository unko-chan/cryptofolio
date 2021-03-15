const accounts = [
  {
    "id": "58542935-67b5-56e1-a3f9-42686e07fa40",
    "name": "My Vault",
    "primary": false,
    "type": "vault",
    "currency": "BTC",
    "balance": {
      "amount": "0.00600000",
      "currency": "BTC"
    },
    "created_at": "2015-01-31T20:49:02Z",
    "updated_at": "2015-01-31T20:49:02Z",
    "resource": "account",
    "resource_path": "/v2/accounts/58542935-67b5-56e1-a3f9-42686e07fa40",
    "ready": true
  },
  {
    "id": "2bbf394c-193b-5b2a-9155-3b4732659ede",
    "name": "My Wallet",
    "primary": true,
    "type": "wallet",
    "currency": "BTC",
    "balance": {
      "amount": "0.00385253",
      "currency": "BTC"
    },
    "created_at": "2015-01-31T20:49:02Z",
    "updated_at": "2015-01-31T20:49:02Z",
    "resource": "account",
    "resource_path": "/v2/accounts/2bbf394c-193b-5b2a-9155-3b4732659ede"
  },
  {
    "id": "2bbf394c-193b-5b2a-9155-3b4732659ede",
    "name": "My Wallet",
    "primary": true,
    "type": "wallet",
    "currency": "ETH",
    "balance": {
      "amount": "0.15059839",
      "currency": "ETH"
    },
    "created_at": "2015-01-31T20:49:02Z",
    "updated_at": "2015-01-31T20:49:02Z",
    "resource": "account",
    "resource_path": "/v2/accounts/2bbf394c-193b-5b2a-9155-3b4732659ede"
  },
  {
    "id": "58542935-67b5-56e1-a3f9-42686e07fa40",
    "name": "My Vault",
    "primary": false,
    "type": "vault",
    "currency": "0x",
    "balance": {
      "amount": "500.35000000",
      "currency": "0x"
    },
    "created_at": "2015-01-31T20:49:02Z",
    "updated_at": "2015-01-31T20:49:02Z",
    "resource": "account",
    "resource_path": "/v2/accounts/58542935-67b5-56e1-a3f9-42686e07fa40",
    "ready": true
  }
];

const conversions = {
  "BTC": 75825.02,
  "ETH": 2367.82,
  "0x": 1.74
};

const getBalances = function(accounts) {
  let balances = {};

  for (const account of accounts) {
    const currency = account.currency;
    const amount = Number(account.balance.amount);

    if (amount > 0) {
      // if the currency also in a different account
      if (balances[currency]) {
        balances[currency] += amount
      } else {
        balances[currency] = amount;
      }
    }
  }

  return balances;
};

const getCurrencies = function(currencyData) {
  let currencies = [];

  for (const curName in currencyData) {
    currencies.push(curName);
  }

  return currencies;
};

const getOwnings = function(currencyData) {
  let ownings = [];

  for (const curName in currencyData) {
    ownings.push(currencyData[curName]);
  }

  return ownings;
};

const getConvertedOwnings = function(balances, conversions) {
  let convertedOwnings = [];

  for (const curName in balances) {
    const conversionRate = conversions[curName];
    const amount = balances[curName];

    convertedOwnings.push(conversionRate * amount);
  }

  return convertedOwnings;
};

const getTotalOwnings = function(ownings) {
  return ownings.reduce((accum, cur) => accum + cur);
}

const getOwningRatios = function(ownings, totalOwnings) {
  return ownings.map(owning => (owning / totalOwnings).toPrecision(2));
};

// const rand = () => Math.floor(Math.random() * 255);

const currencyColors = function(colors) {
  return colors.map(color => 'rgba' + color.rgb);
};

const balances = getBalances(accounts);

const currencies = getCurrencies(balances);
console.log(currencies);

const convertedOwnings = getConvertedOwnings(balances, conversions);
console.log(convertedOwnings);

const totalOwnings = getTotalOwnings(convertedOwnings);
console.log(totalOwnings);

const owningRatios = getOwningRatios(convertedOwnings, totalOwnings);
console.log(owningRatios);

export {
  getBalances,
  getCurrencies,
  getConvertedOwnings,
  getTotalOwnings,
  getOwningRatios,
  currencyColors
};