import react from 'react';
import Doughnut from '../charts/Doughnut';
import Transaction from './PastTransaction';
import Wallet from './Wallet';
import PerformanceLine from '../charts/PerformanceLine';
import PerformanceBar from '../charts/PerformanceBar';
import PerformanceMultiLine from '../charts/PerformanceMultiLine';

import './Dashboard.scss';

const Dashboard = (props) => {
  return (
    <div className="dashboard-container">

      <section className="username-display">
        Username
        <h2 >Recent Transactions</h2>
        <Transaction />
        <a href="#section">All previous transactions</a> 
      </section>

      <div className="doughnut">
        <Doughnut />
      </div>
      
      <Wallet />
      <PerformanceMultiLine />
      <PerformanceLine />
      <PerformanceBar />
    
    </div>
  )
}

export default Dashboard;