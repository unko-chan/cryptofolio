import React from 'react';
import './exchange.scss';
import RebalanceView from './rebalance/RebalanceView';

export default function Exchange() {
  return (
    <>
      <div className="page-header">
        Rebalance
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
