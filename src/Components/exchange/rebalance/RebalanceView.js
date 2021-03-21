import React, { useState } from 'react';
import PieExample from '../../charts/PieExample';
import BasicTable from './BasicTable';
import RebalanceSettings from './RebalanceSettings';
import RebalanceToggle from './RebalanceToggle';

export default function RebalanceView() {
  const [rows, setRows] = useState({
    Bitcoin: '65',
    Ethereum: '25',
    Litecoin: '10',
  });

  return (
    <>
      <div className="rebalance-header">
        <h1>Portfolio Rebalance</h1>
        <RebalanceToggle />
      </div>
      <div className="rebalance-view">
        <div className="allocation-chart">
          <PieExample values={Object.values(rows).map(i => parseInt(i))} />
        </div>
        <div className="allocation-table">
          <BasicTable rows={rows} setRows={setRows} />
        </div>
        <div>
          <RebalanceSettings />
        </div>
      </div>
    </>
  );
}
