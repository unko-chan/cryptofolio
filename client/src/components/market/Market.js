import React, { useEffect, useState } from 'react';
import TradingWidget from './TradingWidget';
import Table from './Table';
import './Market.scss';

const Market = () => {
  return (
    <>
      <div className="page-header">Market</div>
      <div className="market-table">
        <Table className="table" />
      </div>
    </>
  );
};

export default Market;
