import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const options = {
  responsive: true,
};

export default function PieExample({ values }) {

  const data = {
    labels: ['BTC', 'ETH', 'LTC'],
    datasets: [
      {
        data: values,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
}
