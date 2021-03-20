import { Line } from 'react-chartjs-2';
import { convertToLine } from './PerformanceLineChart';

export default function PerformanceMultiLine(props) {
  const data = {
    //x axis data
    // labels: props.timeState,
    datasets: [
      {
        label: 'Value 1',
        //y axis data
        data: convertToLine(props.currencyBalances[0]),
        fill: false,
        borderColor: 'rgb(55, 155, 255)',
        //sets chart line straight
        lineTension: 0,
        pointRadius: 1,
        pointHitRadius: 10,
      },
      {
        label: 'Value 2',
        //y axis data
        data: convertToLine(props.currencyBalances[1]),
        fill: false,
        borderColor: 'rgb(255, 100, 100)',
        //sets chart line straight
        lineTension: 0,
        pointRadius: 1,
        pointHitRadius: 10,
      },
      {
        label: 'Value 3',
        //y axis data
        data: convertToLine(props.currencyBalances[2]),
        fill: false,
        borderColor: 'rgb(105, 100, 100)',
        //sets chart line straight
        lineTension: 0,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: props.timeState,
          ticks: {
            autoSkip: true,
            min: props.xTickState
          }
        },
      ]
    },
  };

  return <Line data={data} options={options} />;
}
