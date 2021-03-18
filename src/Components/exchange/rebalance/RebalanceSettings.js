import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

export default function BasicTable() {
  const classes = useStyles();

  const offsetLimit = 5

  return (
    <Paper>
      <Toolbar>
        <Typography className={classes.title}>Settings</Typography>
      </Toolbar>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Frequency
              </TableCell>
              <TableCell align="right">
                <button>1D</button>
                <button>3D</button>
                <button>1W</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Min. offset limit
              </TableCell>
              <TableCell align="right">{offsetLimit + '%'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
