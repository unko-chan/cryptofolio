import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import PerformanceBar from '../charts/PerformanceBar';
import PerformanceMultiLine from '../charts/PerformanceMultiLine';
import PerformanceLine from '../charts/PerformanceLineChart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
  },
  buttonGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const Charts = () => {
  const [viewState, setViewState] = useState('showAll');
  const [xTickState, setxTickState] = useState('2020-11-16');
  const [yTickState, setyTickState] = useState(0);
  const [timeState, setTimeState] = useState({
    unit: 'month',
    displayFormats: { month: 'MMM YYYY' },
  });

  const classes = useStyles();

  const [chart, setChart] = useState('lineChart');

  const showAll = () => {
    if (viewState !== 'showAll') {
      setViewState('showAll');
      setxTickState('2020-11-16');
      setyTickState(0);
      setTimeState({
        unit: 'month',
        displayFormats: { month: 'MMM YYYY' },
      });
    }
  };

  const showMonth = () => {
    if (viewState !== 'showMonth') {
      setViewState('showMonth');
      setxTickState('2021-02-15');
      setyTickState(4000);
      setTimeState({
        unit: 'week',
        displayFormats: { week: 'MMM DD' },
      });
    }
  };

  const showWeek = () => {
    if (viewState !== 'showWeek') {
      setViewState('showWeek');
      setxTickState('2021-03-07');
      setyTickState(8000);
      setTimeState({
        unit: 'day',
        displayFormats: { day: 'MMM DD' },
      });
    }
  };

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={9}>
          <ButtonGroup size="small" aria-label="small outlined button group" className={classes.buttonGroup}>
            <Button onClick={() => setChart('lineChart')}>Line</Button>
            <Button onClick={() => setChart('barChart')}>Bar</Button>
            <Button onClick={() => setChart('multiLineChart')}>Multiline</Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={3}>
          <ButtonGroup size="small" aria-label="small outlined button group" className={classes.buttonGroup}>
            <Button onClick={showAll}>All</Button>
            <Button onClick={showMonth}>Month</Button>
            <Button onClick={showWeek}>Week</Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      { chart === 'lineChart' ? <PerformanceLine viewState={viewState} xTickState={xTickState} yTickState={yTickState} timeState={timeState}/> 
        : chart === 'barChart' ? <PerformanceBar />
        : <PerformanceMultiLine />
      }
    </Paper>
  );
};

export default Charts;