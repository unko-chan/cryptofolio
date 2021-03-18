import React from 'react';
import PieExample from '../../charts/PieExample';
import BasicTable from './BasicTable';
import RebalanceSettings from './RebalanceSettings';
import RebalanceToggle from './RebalanceToggle';

export default function RebalanceView() {
  return (
    <>
      <div className="rebalance-header">
        <h1>Portfolio Rebalance</h1>
        <RebalanceToggle />
      </div>
      <div className="rebalance-view">
        <div className="allocation-chart">
          <PieExample />
        </div>
        <div className="allocation-table">
          <BasicTable />
        </div>
        <div>
          <RebalanceSettings />
        </div>
      </div>
    </>
  );
}
