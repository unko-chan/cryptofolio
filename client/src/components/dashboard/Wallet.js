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

const findMostRecentBalance = function(currencyBalance) {
  const dates = Object.keys(currencyBalance);
  const lastDate = dates[dates.length - 1];
  return currencyBalance[lastDate];
};

export default function WalletCard(props) {
  const [period, setPeriod] = useState('month');
  const [dollarGrowth, setDollarGrowth] = useState(0);
  const [percentGrowth, setPercentGrowth] = useState(0);

  const { transactions, totalBalance } = props;

  const totRecentBalance = findMostRecentBalance(totalBalance);

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
            ? '$' + Number(totRecentBalance).toFixed(2)
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
        <div className="wallet-growth">${dollarGrowth}</div>
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
        <div className="wallet-growth">{percentGrowth}%</div>
      </div>
    </Paper>
  );
}
