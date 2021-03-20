import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import data from '../../data/accounts.json';
import { owningRatios, getBalances, } from '../../helpers/pieChartHelper';
import variable from '../currency_details/CurrencyDetails'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
  typography: {
    fontWeight: 300,
  }
});

const CurrentCurrency = (props) => {
  const classes = useStyles();
  const balances = getBalances(data);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography className={classes.typography}>
                Currency
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography className={classes.typography}>
                Balance
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography className={classes.typography}>
                Wallet&nbsp;Allocation
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(getBalances(data)).map((key, index) => (
          <TableRow key={index}>
          <TableCell component="th" scope="row">
            <a href="#">{key}</a>
          </TableCell>
          <TableCell align="right" >{balances[key].toFixed(2)}</TableCell>
          <TableCell align="right">{Math.round(owningRatios[index] * 100).toFixed(2)}%</TableCell>
          </TableRow>
         ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CurrentCurrency;