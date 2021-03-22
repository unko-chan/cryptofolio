import React, { useEffect, useState } from 'react';
import TradingWidget from './TradingWidget';
import Table from './Table';
import './Market.scss';

const Market = () => {


  return (
    <>
      <div className="page-header">
        <h1> Market </h1>
      </div>
      <Table className="table" />
    </>
  );
};

export default Market;