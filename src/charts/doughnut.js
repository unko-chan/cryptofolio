import { Doughnut, Chart } from 'react-chartjs-2';
import accounts from '../data/accounts.json';
import conversions from '../data/conversions.json';
import colors from '../data/colors.json';
import { getBalances, getCurrencies, getConvertedOwnings, getTotalOwnings, getOwningRatios, currencyColors } from '../helpers/pieChartHelper';

export default function tokenPieChart() {
  const balances = getBalances(accounts);
  const currencies = getCurrencies(balances);
  const convertedOwnings = getConvertedOwnings(balances, conversions);
  const totalOwnings = getTotalOwnings(convertedOwnings);
  const ratios = getOwningRatios(convertedOwnings, totalOwnings);
  const filteredColors = currencyColors(colors);

  // format text inside a donut using canvas
  // https://stackoverflow.com/questions/42759306/add-text-inside-doughnut-chart-from-chart-js-2-in-react
  const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
  Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw: function() {
      originalDoughnutDraw.apply(this, arguments);
      
      const chart = this.chart;
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;

      const fontSize = (height / 120).toFixed(2);
      ctx.font = fontSize + "em Times";
      ctx.textBaseline = "hanging";

      const text = chart.config.data.text,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;

      ctx.fillText(text, textX, textY);
    }
  });

  const data = {
    labels: currencies,
    datasets: [
      {
        label: 'owning percentage',
        data: ratios,
        backgroundColor: filteredColors,
        borderColor: filteredColors
      }
    ],
    text: "$" + Math.round(totalOwnings)
  };

  const options = {
    cutoutPercentage: 65
  }

  return <Doughnut data={data} options={options}/>
}