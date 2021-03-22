import React from 'react';
import './exchange.scss';
import RebalanceView from './rebalance/RebalanceView';

export default function Exchange() {
  return (
    <>
      <div className="page-header">
        <h1>Rebalance</h1>
      </div>

      <div className="trade-select">
        <button>Rebalance</button>
        <button>Buy</button>
        <button>Sell</button>
      </div>
      <RebalanceView />
    </>
  );
}
