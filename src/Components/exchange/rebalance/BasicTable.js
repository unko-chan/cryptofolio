import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';
import { FormatColorResetRounded } from '@material-ui/icons';

/*
tooltip onClick -> Allocation = textfield (have current values in input field)
can delete

onSave ->
update table with new values
*/

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
  title: {
    flex: '1 1 100%',
  },
});

export default function BasicTable(props) {
  const { rows, setRows } = props;

  const [editMode, setEditMode] = useState(false);
  const [confirmMode, setConfirmMode] = useState(false);

  const [editRows, setEditRows] = useState({ ...rows });
  const classes = useStyles();

  const onEdit = () => {
    setEditMode(true);
  };

  const onSave = () => {
    let sum = 0;
    for (const val in editRows) {
      sum += parseInt(editRows[val]);
    }
    if (sum === 100) {
      setConfirmMode(true);
    } else if (sum === 0) {
      onCancel();
    }
    console.log(sum);
    console.log('editRows', editRows);
  };

  const confirmSave = () => {
    setRows(editRows);
    setEditMode(false);
    setConfirmMode(false);
  };

  const onCancel = () => {
    setEditMode(false);
  };

  const onDelete = (currency) => {
    console.log(currency);
  };

  return (
    <Paper>
      <Toolbar>
        <Typography className={classes.title}>Rebalance</Typography>
        <IconButton>
          <EditIcon onClick={onEdit} />
        </IconButton>
      </Toolbar>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell align="right">Allocation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(rows).map(([currency, allocation]) => (
              <TableRow key={currency}>
                <TableCell component="th" scope="row">
                  {currency}
                </TableCell>
                <TableCell align="right">
                  {editMode ? (
                    <>
                      <TextField
                        className="allocation-field"
                        id="allocation"
                        label="Percent"
                        type="number"
                        defaultValue={allocation}
                        onChange={(e) => {
                          setEditRows({
                            ...editRows,
                            [currency]: e.target.value,
                          });
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <IconButton>
                        <ClearIcon onClick={() => onDelete(currency)} />
                      </IconButton>
                    </>
                  ) : (
                    allocation + '%'
                  )}
                </TableCell>
              </TableRow>
            ))}

            {editMode &&
              (confirmMode ? (
                <>
                  <TableCell>
                    <Typography>Confirm save?</Typography>
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    <Button color="error" onClick={() => setConfirmMode(false)}>
                      Cancel
                    </Button>
                    <Button onClick={confirmSave}>Save</Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell component="th" scope="row">
                    <Button color="error" onClick={onCancel}>
                      Cancel
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={onSave}>Save</Button>
                  </TableCell>
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
