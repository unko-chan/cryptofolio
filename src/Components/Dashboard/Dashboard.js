import React from 'react';
import Doughnut from '../charts/Doughnut';
import Transaction from './PastTransaction';
import Wallet from './Wallet';
import PerformanceLine from '../charts/PerformanceLine';
import PerformanceBar from '../charts/PerformanceBar';
import PerformanceMultiLine from '../charts/PerformanceMultiLine';
import LineChart from '../LineChart'
import TradingWidget from '../TradingWidget';
import Currency from './CurrentUserCurrency';

import './dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <section className="top-section">
        {/* https://www.chartjs.org/docs/latest/general/responsive.html */}
        <div className="chart-container">
          <Doughnut />
        </div>

        <div className="wallet-container">
          <Wallet />
        </div>
      </section>

      <section className="middle-section">
        <div className="pc1">
          <LineChart />
        </div>

        <div className="pc2">
          <PerformanceBar />
        </div>
      </section>

      <section className="bottom-section">
        <div className="currency-container">
         <Currency />
        </div>

        <div className="transactions">
          <Transaction />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;