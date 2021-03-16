import {
  getBalances,
  getCurrencies,
  currencyColors,
} from '../../helpers/pieChartHelper';

import colors from '../../data/colors.json';
import accounts from '../../data/accounts.json';
import { Bar } from 'react-chartjs-2';

const performance = ['4', '6', '-3', '-6', '8'];

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
  return <Bar data={data} options={options} />;
}
