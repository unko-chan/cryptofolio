import React from 'react';
import Doughnut from '../charts/Doughnut';
import Transaction from './PastTransaction';
import Wallet from './Wallet';
import Charts from './Charts';
import Currency from './CurrentUserCurrency';

import './dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <section className="top-section">
        {/* https://www.chartjs.org/docs/latest/general/responsive.html */}
        <div className="doughnut-container">
          <Doughnut />
        </div>

        <div className="wallet-container">
          <Wallet />
        </div>
      </section>

      <section className="middle-section">
        <div className="chart-container">
          <Charts />
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