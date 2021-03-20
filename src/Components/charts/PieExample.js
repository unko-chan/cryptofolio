import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const options = {
  responsive: true,
  cutoutPercentage: 65,
  legend: {
    display: false,
  },
};

export default function PieExample({ values }) {

  console.log(values)

  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
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
