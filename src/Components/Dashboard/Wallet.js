import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

import { totalOwnings } from '../../helpers/pieChartHelper';
import { findTransactionAmount, calculateDollarGrowth, calculatePercentGrowth } from '../../helpers/transactionHelper';
import transactions from '../../data/transactions.json';
import { Breadcrumbs } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '1em',
  },
  icon: {
    fontSize: 30,
    padding: '0 15px',
  },
  heading: {
    padding: theme.spacing(2)
  },
  breadcrumbs: {
    padding: theme.spacing(1),
    marginTop: '0.7em'
  }
}));

// find monthly growth amount and percentage
const monthlyDollarGrowth = calculateDollarGrowth("month", transactions);
const monthlyPercentGrowth = calculatePercentGrowth("month", transactions);

// find yearly growth amount and percentage
const yearlyDollarGrowth = calculateDollarGrowth("year", transactions);
const yearlyPercentGrowth = calculatePercentGrowth("year", transactions);

// find weekly growth amount and percentage
const weeklyDollarGrowth = calculateDollarGrowth("week", transactions);
const weeklyPercentGrowth = calculatePercentGrowth("week", transactions);

// daily
const dailyDollarGrowth = calculateDollarGrowth("day", transactions);
const dailyPercentGrowth = calculatePercentGrowth("day", transactions);

export default function WalletCard() {
  const classes = useStyles();
  const [period, setPeriod] = useState("month");

  return (
    <Card>
      <Grid container className={classes.root}>
        <Grid item xs={8} >
          <Typography variant="h5" className={classes.heading}>
            Your Assets
            {/* <AccountBalanceWalletIcon className={classes.icon}/> */}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Breadcrumbs className={classes.breadcrumbs}>
            <Typography onClick={() => setPeriod("year")}>
              Y
            </Typography>
            <Typography onClick={() => setPeriod("month")}>
              M
            </Typography>
            <Typography onClick={() => setPeriod("week")}>
              W
            </Typography>
            <Typography onClick={() => setPeriod("day")}>
              D
            </Typography>
          </Breadcrumbs>
        </Grid>

      </Grid>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={4} >
          <Paper className={classes.paper}>
            <Typography>
              Current Total ($)
            </Typography>
            ${totalOwnings}
          </Paper>
        </Grid>

        <Grid item xs={4} >
          <Paper className={classes.paper}>
            <Typography>
              { period === "month" ? "Monthly" 
                : period === "year" ? "Yearly"
                : period === "week" ? "Weekly"
                : "Daily"
              } Growth ($)
            </Typography>
            ${ period === "month" ? monthlyDollarGrowth 
              : period === "year" ? yearlyDollarGrowth
              : period === "week" ? weeklyDollarGrowth
              : dailyDollarGrowth
            }
          </Paper>
        </Grid>

        <Grid item xs={4} >
          <Paper className={classes.paper}>              
            <Typography>
              { period === "month" ? "Monthly" 
                : period === "year" ? "Yearly"
                : period === "week" ? "Weekly"
                : "Daily"
              } Growth (%)
            </Typography>
            { period === "month" ? monthlyPercentGrowth 
              : period === "year" ? yearlyPercentGrowth
              : period === "week" ? weeklyPercentGrowth
              : dailyPercentGrowth
            }%
          </Paper>
        </Grid>
      </Grid>
    </Card>
  );
};