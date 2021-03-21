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
  getCurrencyPricingData,
  convertCurrencyOwnings,
  findMinPeriodBalance,
  findAllCurrencyOwnings,
  sumAllOwnings,
} from '../../helpers/CurrencyPricings';

const balances = require('../../walletData/btcData.json');

const allCurrencies = ['BTC', 'ETH', 'LTC'];

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
  },
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
  const [totalBalance, setTotalBalance] = useState({});
  const [currencyBalances, setCurrencyBalances] = useState([]);

  useEffect(() => {
    const promises = findAllCurrencyOwnings(allCurrencies); 
    promises.then(res => setCurrencyBalances(res));
    sumAllOwnings(promises).then((prices) => setTotalBalance(prices));
  }, []);

  // const convertedBalances = convertCurrencyOwnings(prices, balances);
  // const setChartDate = function(days) {
  //   const today = new Date();
  //   return today.setDate(today.getDate() - days);
  // };

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
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={9}>
          <ButtonGroup
            size="small"
            aria-label="small outlined button group"
            className={classes.buttonGroup}
          >
            <Button onClick={() => setChart('lineChart')}>Line</Button>
            <Button onClick={() => setChart('barChart')}>Bar</Button>
            <Button onClick={() => setChart('multiLineChart')}>
              Multiline
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={3}>
          <ButtonGroup
            size="small"
            aria-label="small outlined button group"
            className={classes.buttonGroup}
          >
            <Button onClick={showAll}>All</Button>
            <Button onClick={showMonth}>Month</Button>
            <Button onClick={showWeek}>Week</Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      {chart === 'lineChart' ? (
        <PerformanceLine
          balances={totalBalance}
          viewState={viewState}
          xTickState={xTickState}
          yTickState={yTickState}
          timeState={timeState}
        />
      ) : chart === 'barChart' ? (
        <PerformanceBar viewState={viewState} />
      ) : (
        <PerformanceMultiLine
          currencyBalances={currencyBalances}
          viewState={viewState}
          xTickState={xTickState}
          yTickState={yTickState}
          timeState={timeState}
        />
      )}
    </Paper>
  );
};

export default Charts;
