import react from 'react';
import Doughnut from '../../charts/doughnut'
import Transaction from './PastTransaction'

import './dashboard.scss';


const Dashboard = (props) => {
return (
  <div className="dashboard-container">
    <section className="username-display">
      Username
    <h2 >Recent Transactions</h2>
      <div>
        <Transaction />
      </div>
      <a href="#section">All previous transactions</a> 

    </section>
    
    <div class="pie-chart">
      <Doughnut />
    </div>
    


  </div>
)

}

export default Dashboard;