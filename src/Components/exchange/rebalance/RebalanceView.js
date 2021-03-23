import React, { useState } from 'react';
import PieExample from '../../charts/PieExample';
import BasicTable from './BasicTable';
import RebalanceSettings from './RebalanceSettings';
import RebalanceToggle from './RebalanceToggle';
import '../exchange.scss';


export default function RebalanceView() {
  const [rows, setRows] = useState({
    Bitcoin: '65',
    Ethereum: '25',
    Litecoin: '10',
  });

  return (
    <>
      <div className="rebalance-header">
        <RebalanceToggle />
      </div>
      <div className="rebalance-view">
        <div className="allocation-chart">
          <PieExample values={Object.values(rows).map((i) => parseInt(i))} />
        </div>
        <div className="allocation-table">
          <BasicTable rows={rows} setRows={setRows} />
          <RebalanceSettings />
        </div>
      </div>
      <blockquote className="rebalance-text">
        <span className="span-style">Note:</span> Your portfolio will be
        automatically rebalanced <span className="time-span">3 days</span> from now.
      </blockquote>
    </>
  );
}
