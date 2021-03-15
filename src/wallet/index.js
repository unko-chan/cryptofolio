import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

import { totalOwnings } from '../helpers/pieChartHelper';
import { findTransactions, findTransactionAmount } from '../helpers/transactionHelper'
import transactions from '../data/transactions.json';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: "1em"
  },
  icon: {
    fontSize: 30,
    padding: '0 15px',
  },
  heading: {
    padding: theme.spacing(2)
  }
}));

const monthlyTransactions = findTransactions(transactions, "month");
const transactionTotal = findTransactionAmount(transactions);

// find monthly growth amount and percentage
const monthlyTotal = findTransactionAmount(monthlyTransactions);
const previousMonthTotal = transactionTotal - monthlyTotal
const monthlyIncrease = (monthlyTotal / previousMonthTotal * 100).toFixed(2);

export default function WalletCard() {
  const classes = useStyles();

  return (
    <Card>
      <Typography variant="h4" className={classes.heading}>
        Wallet
        <AccountBalanceWalletIcon className={classes.icon}/>
      </Typography>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={3} spacing={3}>
            <Paper className={classes.paper}>
              <Typography>
                Current Total ($)
              </Typography>
              ${totalOwnings}
            </Paper>
        </Grid>

        <Grid item xs={3} spacing={3}>
            <Paper className={classes.paper}>
              <Typography>
                Monthly Growth ($)
              </Typography>
              ${monthlyTotal}
            </Paper>
        </Grid>

        <Grid item xs={3} spacing={3}>
            <Paper className={classes.paper}>              
              <Typography>
                Monthly Growth (%)
              </Typography>
              {monthlyIncrease}%
            </Paper>
        </Grid>
      </Grid>
    </Card>
  );
};