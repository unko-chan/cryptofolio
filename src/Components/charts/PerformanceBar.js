import React from 'react';
import {
  getBalances,
  getCurrencies,
  currencyColors,
} from '../../helpers/pieChartHelper';

import colors from '../../data/colors.json';
import accounts from '../../data/accounts.json';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const performance = ['4', '6', '-3', '-6', '8'];

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
const currencies = getCurrencies(balances);
const filteredColors = currencyColors(colors);
const barColors = getBarColor(performance);

export default function () {
  const classes = useStyles();

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
  const options = {
    legend: {
      display: false,
    },
  };

  return (
    <Paper className={classes.paper}>
      <Bar data={data} options={options} />
    </Paper>
  )
}
