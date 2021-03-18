import React from 'react';
import './exchange.scss';
import PieExample from '../charts/PieExample';
import BasicTable from './BasicTable'
import RebalanceSettings from './RebalanceSettings';
import RebalanceToggle from './RebalanceToggle';



export default function Exchange() {
  return (
    <section>
      <div className="page-header">
        <h1> Exchange </h1>
      </div>

      <div className="trade-select">
        <button>Rebalance</button>
        <button>Buy</button>
        <button>Sell</button>
      </div>
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
    </section>
  );
}
