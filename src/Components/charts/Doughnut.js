import React from 'react';
import { Doughnut, Chart } from 'react-chartjs-2';
import { currencyColors, filteredColors } from '../../helpers/pieChartHelper';
// import './Doughnut.scss';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1em",
    marginRight: "1em"
  }
}));

export default function TokenPieChart(props) {
  const classes = useStyles();

  const { totalBalance, currencyBalances } = props;

  // console.log(currencyBalances.map(c => Object.keys(c)));

  // format text inside a donut using canvas
  // https://stackoverflow.com/questions/42759306/add-text-inside-doughnut-chart-from-chart-js-2-in-react
  
  // const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
  // Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  //   draw: function() {
  //     originalDoughnutDraw.apply(this, arguments);
      
  //     const chart = this.chart;
  //     const ctx = chart.ctx;
  //     const width = chart.width;
  //     const height = chart.height;

  //     const fontSize = (height / 120).toFixed(2);
  //     ctx.font = fontSize + "em Times";
  //     ctx.textBaseline = "hanging";

  //     const text = chart.config.data.text,
  //         textX = Math.round((width - ctx.measureText(text).width) / 2),
  //         textY = height / 2;

  //     ctx.fillText(text, textX, textY);
  //   }
  // });

  const findMostRecentBalance = function(currencyBalance) {
    const dates = Object.keys(currencyBalance);
    const lastDate = dates[dates.length - 1];
    return currencyBalance[lastDate];
  };

  const totRecentBalance = findMostRecentBalance(totalBalance);

  const owningRatios = currencyBalances.map(c => {
    return findMostRecentBalance(c) / totRecentBalance;
  });

  const data = {
    labels: ["BTC", "ETH", "LTC"],
    datasets: [
      {
        label: 'owning percentage',
        data: owningRatios,
        backgroundColor: filteredColors,
        borderColor: filteredColors
      }
    ],
    // text: "$" + Math.round(totalOwnings)
  };

  const options = {
    cutoutPercentage: 70
  };

  return (
    <Paper className={classes.paper} >
      <Doughnut data={data} options={options}/>
    </Paper>
  )
}