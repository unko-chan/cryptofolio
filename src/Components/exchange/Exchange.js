import React from 'react';
import './exchange.scss';
import PieExample from '../charts/PieExample';
import BasicTable from './BasicTable'

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

      <h1>Portfolio Rebalance</h1>
      <div className="rebalance-view">
        <div className="allocation-chart">
          <PieExample />
        </div>
        <div>
          <BasicTable />
        </div>
      </div>
    </section>
  );
}