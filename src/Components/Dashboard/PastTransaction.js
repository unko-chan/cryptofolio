import { React, useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import transactions from '../../data/transactions.json';
import { fullCurrencyName } from '../../helpers/transactionHelper';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(2),
  },
  heading: {
    // padding: theme.spacing(2),
  },
}));

const fullDateConverter = (date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthNumber = parseInt(date.slice(5, 7));
  return ` ${months[monthNumber - 1]} ${date.slice(8, 10)}, ${date.slice(
    0,
    4
  )}`;
};

const Transaction = (props) => {
  const classes = useStyles();
  // const [transactionList, setTransactionList] = useState([]);

  // const getTransactions = async () => {
  //   const data = await fetch('http://localhost:5000/transactions', {
  //     headers: {"Content-Type": "application/json"}
  //   }).then( async (response) => {
  //    const transaction = await response.json();
  //    setTransactionList(transaction);
  //   })
  //   return data;
  // }

  const { transactions } = props;

  const formatHeading = function (transaction) {
    return (
      transaction.transaction_type +
      ' ' +
      fullCurrencyName(transaction.currency_symbol)
    );
  };

  const formatDescription = function (transaction) {
    return (
      transaction.amount +
      ' ' +
      transaction.currency_symbol +
      ' on ' +
      fullDateConverter(transaction.date_occured)
    );
  };

  const transactionItems = transactions.map((transaction, index) => (
    <div className="recent-transactions">
      <ListItem key={index}>
        <ListItemAvatar>
          <Avatar>
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={formatHeading(transaction)}
          secondary={formatDescription(transaction)}
        />
      </ListItem>
      <Divider component="li" />
    </div>
  ));

  return (
    <>
      <Paper variant="outlined">
        <List className={classes.root}>{transactionItems.splice(0, 8)}</List>
      </Paper>
    </>
  );
};

export default Transaction;
