import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {
  calculateDollarGrowth,
  calculatePercentGrowth,
} from '../../helpers/transactionHelper';

import { Breadcrumbs } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   padding: theme.spacing(2),
  // },
  // paper: {
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  //   margin: '1em',
  // },
  // icon: {
  //   fontSize: 30,
  //   padding: '0 15px',
  // },
  // heading: {
  //   padding: theme.spacing(2),
  // },
  // breadcrumbs: {
  //   padding: theme.spacing(1),
  //   marginTop: '0.7em',
  // },
}));

export default function WalletCard(props) {
  const classes = useStyles();
  const [period, setPeriod] = useState('month');
  const [dollarGrowth, setDollarGrowth] = useState(0);
  const [percentGrowth, setPercentGrowth] = useState(0);

  const { transactions, totalBalance } = props;

  useEffect(() => {
    // find monthly growth amount and percentage
    setDollarGrowth(calculateDollarGrowth(period, transactions));
    setPercentGrowth(calculatePercentGrowth(period, transactions));
  }, [transactions, period]);

  return (
    <Paper variant="outlined">
      <div className="wallet-buttons">
          <Button onClick={() => setPeriod('year')}>1y</Button>
          <Button onClick={() => setPeriod('month')}>1m</Button>
          <Button onClick={() => setPeriod('week')}>1w</Button>
          <Button onClick={() => setPeriod('day')}>1d</Button>
      </div>
      <div className="wallet-line">
        <div className="wallet-text">Portfolio Value</div>
        {/* assuming that we know march 22nd is the last day */}
        <div className="wallet-number">
          {totalBalance
            ? '$' + Number(totalBalance['2021-03-22']).toFixed(2)
            : 'unknown'}
        </div>
      </div>
      <div className="wallet-line">
        <div className="wallet-text">
          {period === 'month'
            ? 'Monthly'
            : period === 'year'
            ? 'Yearly'
            : period === 'week'
            ? 'Weekly'
            : 'Daily'}{' '}
          Growth ($)
        </div>
        <div className="wallet-number">${dollarGrowth}</div>
      </div>
      <div className="wallet-line">
        <div className="wallet-text">
          {period === 'month'
            ? 'Monthly'
            : period === 'year'
            ? 'Yearly'
            : period === 'week'
            ? 'Weekly'
            : 'Daily'}{' '}
          Change (%)
        </div>
        <div className="wallet-number">{percentGrowth}%</div>
      </div>
    </Paper>
  );
}
