import React from 'react';
import {
  getBalances,
  getCurrencies,
  currencyColors,
} from '../../helpers/pieChartHelper';

import {
  findCurrencyPercentGrowth
} from '../../helpers/transactionHelper';

import colors from '../../data/colors.json';
import accounts from '../../data/accounts.json';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// transactions need to be stubbed out
import transactions from '../../data/transactions.json'; 
// const performance = ['4', '6', '-3', '-6', '8'];

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  }
}));

const getBarColor = function (performance) {
  const color = [];
  performance.forEach((int) => {
    if (int > 0) {
      color.push('rgb(55, 155, 255)');
    } else {
      color.push('rgb(255, 100, 100)');
    }
  });
  return color;
};

const balances = getBalances(accounts);
// const currencies = getCurrencies(balances);

const currencies = ['BTC', 'ETH', 'LTC'];

const convertViewState = function(viewState) {
  switch (viewState) {
    case "showAll":
      return "year";
    case "showMonth":
      return "month";
    case "showWeek":
      return "week";
  }
};

export default function(props) {
  // const classes = useStyles();

  const period = convertViewState(props.viewState);

  const performance = currencies.map(currency_symbol => findCurrencyPercentGrowth(props.transactions, currency_symbol, period));

  console.log('this is performance',performance);

  const barColors = getBarColor(performance);

  const data = {
    labels: currencies,
    datasets: [
      {
        label: currencies,
        data: performance,
        backgroundColor: barColors,
        borderColor: barColors,
      },
    ],
  };

  // x axis is the currency
  // y axis is the performance increase or decrease
  const options = {
    legend: {
      display: false,
    }
  };

  return <Bar data={data} options={options} />
}
