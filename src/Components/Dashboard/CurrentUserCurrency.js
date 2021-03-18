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
import { owningRatios, getBalances, } from '../../helpers/pieChartHelper';
import CurrencyDetails from '../currency_details/CurrencyDetails';



const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

const CurrentCurrency = (props) => {
  const classes = useStyles();
  const balances = getBalances(data);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Wallet&nbsp;Allocation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(getBalances(data)).map((key, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              <Link to={`dashboard/${key}`}>{key}</Link>
            </TableCell>
          <TableCell align="right" >{balances[key]}</TableCell>
          <TableCell align="right">{Math.round(owningRatios[index] * 100)}%</TableCell>
          </TableRow>
         ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CurrentCurrency;