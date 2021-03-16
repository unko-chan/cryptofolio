import react from 'react';
import Doughnut from '../charts/Doughnut';
import Transaction from './PastTransaction';
import Wallet from './Wallet';
import PerformanceLine from '../charts/PerformanceLine';
import PerformanceBar from '../charts/PerformanceBar';
import PerformanceMultiLine from '../charts/PerformanceMultiLine';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard-container">

      <section className="top-section">
        <Doughnut />
        <Wallet />
      </section>
      
      <section className="transactions">
        <Transaction />
      </section>

      <PerformanceMultiLine />
      <PerformanceLine />
      <PerformanceBar />
    
    </div>
  )
}

export default Dashboard;