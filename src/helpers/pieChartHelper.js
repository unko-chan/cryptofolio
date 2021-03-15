import accounts from '../data/accounts.json';
import conversions from '../data/conversions.json';
import colors from '../data/colors.json';

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
  return ownings.reduce((accum, cur) => accum + cur).toFixed(2);
}

const getOwningRatios = function(ownings, totalOwnings) {
  return ownings.map(owning => (owning / totalOwnings).toFixed(2));
};

// const rand = () => Math.floor(Math.random() * 255);

const currencyColors = function(colors) {
  return colors.map(color => 'rgba' + color.rgb);
};

const balances = getBalances(accounts);

export const currencies = getCurrencies(balances);
export const convertedOwnings = getConvertedOwnings(balances, conversions);
export const totalOwnings = getTotalOwnings(convertedOwnings);
export const owningRatios = getOwningRatios(convertedOwnings, totalOwnings);
export const filteredColors = currencyColors(colors);

export {
  getBalances,
  getCurrencies,
  getConvertedOwnings,
  getTotalOwnings,
  getOwningRatios,
  currencyColors
};