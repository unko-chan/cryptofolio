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

function createData(number, name, price, change, marketCap, symbol, image) {
  return { number, name, price, change, marketCap, symbol, image };
};

// borrowed from stack overflow
// https://stackoverflow.com/questions/36734201/how-to-convert-numbers-to-million-in-javascript/36734774
function convertCurrency (labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

  ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
  // Six Zeroes for Millions 
  : Math.abs(Number(labelValue)) >= 1.0e+6

  ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(labelValue)) >= 1.0e+3

  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

  : Math.abs(Number(labelValue));

}

// const rows = [
//   createData(1, "Bitcoin", "70149.74", "-0.52", "1.3T", "BTC"),
//   createData(2, "Ethereum", "2237.76", "-0.13", "257.3B", "ETH"),
//   createData(3, "Uniswap", "36.47", "-2.79", "19.0B", "UNI"),
//   createData(4, "Litecoin", "249.28", "-1.68", "16.6B", "LTC"),
//   createData(5, "ChainLink", "34.5", "-0.08", "14.1B", "LINK")
// ];

const useStyles = makeStyles(theme => ({
  table: {
    margin: '1%',
    width: '98%',
    marginTop: '3em'
  }
}))

const MarketTable = (props) => {
  const [watchList, setWatchList] = useState(["BTC", "ETH"]);
  const [rows, setRows] = useState([]);
  const classes = useStyles();

  const axios = require('axios');

  useEffect(() => {
    // using CoinGecko's API endpoints
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h';
    axios.get(url)
      .then(res => {
        setRows(res.data.map((currency, index) => {
          const { name, current_price, price_change_percentage_1h_in_currency, market_cap, symbol, image } = currency;
          return createData(index, name, current_price.toFixed(2), price_change_percentage_1h_in_currency.toFixed(2), convertCurrency(market_cap), symbol, image);
        }))
      });
  }, []);

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
      <TableCell>
        <img src={row.image} width="40" height="40"/>
        <Typography variant="h6" color="inherit">
        {row.name}
        </Typography>
      </TableCell>
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