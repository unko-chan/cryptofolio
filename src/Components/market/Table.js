import React, { useState, useEffect, useRef } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import { yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

function createData(number, name, price, change, marketCap, symbol) {
  return { number, name, price, change, marketCap, symbol };
};

const rows = [
  createData(1, "Bitcoin", "70149.74", "-0.52", "1.3T", "BTC"),
  createData(2, "Ethereum", "2237.76", "-0.13", "257.3B", "ETH"),
  createData(3, "Uniswap", "36.47", "-2.79", "19.0B", "UNI"),
  createData(4, "Litecoin", "249.28", "-1.68", "16.6B", "LTC"),
  createData(5, "ChainLink", "34.5", "-0.08", "14.1B", "LINK")
];

const useStyles = makeStyles(theme => ({
  table: {
    margin: '1%',
    width: '98%',
    marginTop: '3em'
  }
}))

const MarketTable = (props) => {
  const [watchList, setWatchList] = useState(["BTC", "ETH"]);
  const classes = useStyles();

  const removeSymbol = function(symbols, symbol) {
    return symbols.filter(s => s !== symbol);
  };
  
  const handleClick = (symbol) => {
    setWatchList((prevState) => {
      return prevState.includes(symbol) ?
        removeSymbol(prevState, symbol) :
        [...prevState, symbol]
    });
  };

  const tableRows = rows.map(row => (
    <TableRow key={row.name}>
      <TableCell>
        <Typography variant="h6" color="inherit">
          {row.number}
        </Typography>
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.price}</TableCell>
      <TableCell>{row.change}</TableCell>
      <TableCell>{row.marketCap}</TableCell>
      <TableCell>
        <Button variant="contained" color="primary">Trade</Button>
      </TableCell>
      <TableCell>
        <StarIcon 
          fontSize="large"
          onClick={() => handleClick(row.symbol)}
          style= {
            watchList.includes(row.symbol) ? { color: yellow[600] } : { color: 'grey' }
          }
        />
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> # </TableCell>
            <TableCell> Name </TableCell>
            <TableCell> Price </TableCell>
            <TableCell> Change </TableCell>
            <TableCell> Market Cap </TableCell>
            <TableCell> Trade </TableCell>
            <TableCell> Watch </TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default MarketTable;