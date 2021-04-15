import { React, useState } from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RebalanceToggle() {
  return (
    <div>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Auto-Rebalance On"
            checked={true}
            labelPlacement="start"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
