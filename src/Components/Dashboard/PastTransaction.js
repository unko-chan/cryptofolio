import React from 'react';
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
import { fullCurrencyName } from '../../helpers/transactionHelper'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '30ch',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  heading: {
    padding: theme.spacing(2)
  }
}))


const changeString = (stringToChange) => {
  if (stringToChange === 'send') {
    return 'Sent';
  } else if (stringToChange === 'buy') {
    return "Bought";
  }
};

const fullDateConverter = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthNumber = parseInt(date.slice(5, 7));
  return` ${months[monthNumber - 1]} ${date.slice(8, 10)}, ${date.slice(0, 4)}`;
};

const Transaction = () => {
  const classes = useStyles();

  const formatHeading = function(transactions, transaction) {
    return changeString(transactions[transaction].type) + " " + fullCurrencyName(transactions[transaction].amount.currency);
  };

  const formatDescription = function(transactions, transaction) {
    return transactions[transaction].amount.amount + " " +
      transactions[transaction].amount.currency + " on " +
      fullDateConverter(transactions[transaction].updated_at.split('T')[0]);
  };

  const listItems = Object.keys(transactions).map((transaction, index) => (
    <div>
      <ListItem key={index}>
        <ListItemAvatar>
          <Avatar>
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={formatHeading(transactions, transaction)}
          secondary={formatDescription(transactions, transaction)}
        />
      </ListItem>
      <Divider component="li" />
    </div>
  ));

  return (
    <List className={classes.root}>
      <Typography variant="h5" className={classes.heading}>
        Recent Transactions
      </Typography>
      <Divider component="li" />
      { listItems }
    </List>
  )
};

export default Transaction;