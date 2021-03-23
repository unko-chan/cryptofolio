import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import data from '../../data/accounts.json';
// import { owningRatios, getBalances, } from '../../helpers/pieChartHelper';

import variable from '../currency_details/CurrencyDetails'
import Typography from '@material-ui/core/Typography';

import CurrencyDetails from '../currency_details/CurrencyDetails';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
  typography: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 500,
  }
});

const CurrentCurrency = (props) => {
  const classes = useStyles();

  const { currencies, currencyBalances, totalBalance } = props;

  const findMostRecentBalance = function(currencyBalance) {
    const dates = Object.keys(currencyBalance);
    const lastDate = dates[dates.length - 1];
    console.log('log!', currencyBalance[lastDate]);
    return currencyBalance[lastDate];
  };

  const totRecentBalance = findMostRecentBalance(totalBalance);

  const owningRatios = currencyBalances.map(c => {
    return findMostRecentBalance(c) / totRecentBalance;
  });

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.typography}>Currency</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className={classes.typography}>Balance</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className={classes.typography}>
                  Wallet&nbsp;Allocation
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currencyBalances &&
              currencyBalances.map((currencyBalance, index) => (
                <TableRow key={index}>
                  {/* <TableCell component="th" scope="row">
              <a href="#">{currencies[index]}</a>
            </TableCell> */}

                  <TableCell component="th" scope="row">
                    <Link to={`dashboard/${currencies[index]}`} className='currency-item'>
                      {currencies[index]}
                    </Link>
                  </TableCell>

                  <TableCell align="right">
                    {(currencyBalance &&
                      findMostRecentBalance(currencyBalance).toFixed(2)) ||
                      'unknown'}
                  </TableCell>

                  <TableCell align="right">
                    {(owningRatios[index] * 100).toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default CurrentCurrency;