import { Pie } from 'react-chartjs-2';
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

  const data = {
    labels: currencies,
    datasets: [
      {
        label: 'owning percentage',
        data: ratios,
        backgroundColor: filteredColors,
        borderColor: filteredColors
      }
    ]
  };

  return <Pie data={data} />
}