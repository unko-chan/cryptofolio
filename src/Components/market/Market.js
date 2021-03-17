import React, { useState } from 'react';
import TradingWidget from '../TradingWidget';
import Table from './Table';
import './Market.scss';

const Market = () => {
  const [symbol, setSymbol] = useState("BTC");

  return (
    <div className="market-container">
      <div className="page-header">
        <h1> Market </h1>
      </div>
      <TradingWidget symbol={symbol} className="trading-widget" />
      <Table symbol={symbol} className="table" />
    </div>
  );
};

export default Market;