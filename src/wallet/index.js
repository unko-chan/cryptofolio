import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { totalOwnings } from '../helpers/pieChartHelper';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

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
                Since Last Month ($)
              </Typography>
              $2000.00
            </Paper>
        </Grid>

        <Grid item xs={3} spacing={3}>
            <Paper className={classes.paper}>              
              <Typography>
                Since Last Month (%)
              </Typography>
              $1000.00 
            </Paper>
        </Grid>
      </Grid>
    </Card>
  );
};