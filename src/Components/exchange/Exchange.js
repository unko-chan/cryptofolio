import React from 'react';
import './exchange.scss';
import RebalanceView from './rebalance/RebalanceView';

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
      <RebalanceView />
    </section>
  );
}
