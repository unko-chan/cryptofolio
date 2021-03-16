import React from 'react';
import Doughnut from '../charts/Doughnut';
import Transaction from './PastTransaction';
import Wallet from './Wallet';
import PerformanceLine from '../charts/PerformanceLine';
import PerformanceBar from '../charts/PerformanceBar';
import PerformanceMultiLine from '../charts/PerformanceMultiLine';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <section className="dashboard-container">

      <section className="top-section">

        {/* https://www.chartjs.org/docs/latest/general/responsive.html */}
        <div className="chart-container">
          <Doughnut />
        </div>

        <div className="wallet-container">
          <Wallet />
        </div>
        
      </section>
      
      <section className="transactions">
        <Transaction />
      </section>

      <PerformanceMultiLine />
      <PerformanceLine />
      <PerformanceBar />
    
    </section>
  )
}

export default Dashboard;