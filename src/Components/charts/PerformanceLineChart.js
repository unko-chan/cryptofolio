import React from 'react';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { getCurrencyPricingData, convertCurrencyOwnings } from '../../helpers/CurrencyPricings';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';
const balances = require('../../walletData/btcData.json');

export function convertToLine(history) {
  let chartData = [];

  for (const date in history) {
    chartData.push({
      x: date,
      y: history[date]
    })
  }

  return chartData;
};

export default function LineChart(props) {
  const chartData = convertToLine(props.balances);

  const data = {
    datasets: [
      {
        label: 'Portoflio Value',
        data: chartData,
        fill: false,
        borderColor: 'rgb(55, 155, 255)',
        lineTension: 0,
        pointRadius: 1,
        pointHitRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
    }, 
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: props.timeState,
          gridLines: {
            offsetGridLines: false,
            color: 'rgba(0, 0, 0, .21)',
          },
          ticks: {
            autoSkip: true,
            min: props.xTickState,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
          ticks: {
            padding: 20,
            min: props.yTickState
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
}
