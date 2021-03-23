import { React, useState } from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RebalanceToggle() {
  const [rebalanceState, setRebalanceState] = useState(false);
  const [rebalanceLabelState, setRebalanceLabelState] = useState(
    'Auto-Rebalance Off'
  );

  const toggle = () => {
    if (rebalanceState) {
      setRebalanceState(false);
      setRebalanceLabelState('Auto-Rebalance Off');
    } else {
      setRebalanceState(true);
      setRebalanceLabelState('Auto-Rebalance On');
    }
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            control={<Switch color="primary" />}
            label={rebalanceLabelState}
            onChange={toggle}
            checked={rebalanceState}
            labelPlacement="start"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
