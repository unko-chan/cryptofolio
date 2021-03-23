import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import PerformanceBar from '../charts/PerformanceBar';
import PerformanceMultiLine from '../charts/PerformanceMultiLine';
import PerformanceLine from '../charts/PerformanceLineChart';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import {
  findMinPeriodBalance,
  findAllCurrencyOwnings,
  sumAllOwnings,
} from '../../helpers/CurrencyPricings';

import { currencyColors } from '../../helpers/pieChartHelper';

const useStyles = makeStyles((theme) => ({
  // paper: {
  //   padding: theme.spacing(5),
  // },
  buttonGroup: {
    marginBottom: theme.spacing(3),
  },
}));

const Charts = (props) => {
  const [viewState, setViewState] = useState('showAll');
  const [xTickState, setxTickState] = useState('2020-11-16');
  const [yTickState, setyTickState] = useState(0);
  const [timeState, setTimeState] = useState({
    unit: 'month',
    displayFormats: { month: 'MMM YYYY' },
  });
  // '2019-09-22'

  const classes = useStyles();
  const [chart, setChart] = useState('lineChart');
  // const [totalBalance, setTotalBalance] = useState({});
  // const [currencyBalances, setCurrencyBalances] = useState([]);
  // const [currencies, setCurrencies] = useState(['BTC', 'ETH', 'LTC']);

  const { transactions, totalBalance, currencyBalances } = props;

  // useEffect(() => {
  //   findAllCurrencyOwnings(currencies)
  //   .then(res => {
  //     setCurrencyBalances(res);
  //     return sumAllOwnings(res);
  //   })
  //   .then(res => {
  //     setTotalBalance(res);
  //   })
  // }, []);

  const showAll = () => {
    if (viewState !== 'showAll') {
      setViewState('showAll');
      setxTickState();
      setyTickState(0);
      setTimeState({
        unit: 'month',
        displayFormats: { month: 'MMM YYYY' },
      });
    }
  };

  const yMonthlyTickMin =
    Math.ceil((findMinPeriodBalance(totalBalance, 30) * 0.95) / 100) * 100;

  const showMonth = () => {
    if (viewState !== 'showMonth') {
      setViewState('showMonth');
      setxTickState(moment().subtract(30, 'days'));
      setyTickState(yMonthlyTickMin);
      setTimeState({
        unit: 'week',
        displayFormats: { week: 'MMM DD' },
      });
    }
  };

  const yWeeklyTickMin =
    Math.ceil((findMinPeriodBalance(totalBalance, 7) * 0.95) / 100) * 100;

  const showWeek = () => {
    if (viewState !== 'showWeek') {
      setViewState('showWeek');
      setxTickState(moment().subtract(7, 'days'));
      setyTickState(yWeeklyTickMin);
      setTimeState({
        unit: 'day',
        displayFormats: { day: 'MMM DD' },
      });
    }
  };

  return (
    <>
      <div className="chart-buttons">
        <div className="chart-type-buttons">
          <Button onClick={() => setChart('lineChart')}>Line</Button>
          <Button onClick={() => setChart('barChart')}>Bar</Button>
          <Button onClick={() => setChart('multiLineChart')}>Multiline</Button>
        </div>

        <div className="date-buttons">
          <Button onClick={showAll}>All</Button>
          <Button onClick={showMonth}>Month</Button>
          <Button onClick={showWeek}>Week</Button>
        </div>
      </div>

      {chart === 'lineChart' && totalBalance ? (
        <PerformanceLine
          balances={totalBalance}
          viewState={viewState}
          xTickState={xTickState}
          yTickState={yTickState}
          timeState={timeState}
        />
      ) : chart === 'barChart' && transactions ? (
        <PerformanceBar viewState={viewState} transactions={transactions} />
      ) : chart === 'multiLineChart' && currencyBalances ? (
        <PerformanceMultiLine
          currencyBalances={currencyBalances}
          viewState={viewState}
          xTickState={xTickState}
          yTickState={yTickState}
          timeState={timeState}
        />
      ) : (
        <div> Loading </div>
      )}
    </>
  );
};

export default Charts;
