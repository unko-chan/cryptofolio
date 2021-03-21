import { React, useEffect, useState } from 'react';
import Doughnut from '../charts/Doughnut';
import Transaction from './PastTransaction';
import Wallet from './Wallet';
import Charts from './Charts';
import Currency from './CurrentUserCurrency';

import { 
  getUserTransactions, 
  getCurrencies
} from '../../helpers/transactionHelper.js';

import './dashboard.scss';

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [currencyPrices, setCurrencyPrices] = useState([]);

  const getUsers = async () => {
    const data = await fetch("http://localhost:5000/users", {
      headers: { "Content-Type": "application/json"}
    }).then( async (response) => {
      const users = await response.json()
      return users;
    })
    setUser(data[0].username)
  };

  const allCurrencies = ["BTC", "ETH", "LTC"];

  // only run requests when the page loads
  useEffect(() => {
    getUsers();

    setCurrencies(allCurrencies);

    getUserTransactions(1)
    .then(transactions => setTransactions(transactions));
  }, []);
  
  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1> {user} Dashboard </h1>
        <div></div>
      </div>
      <section className="top-section">
        {/* https://www.chartjs.org/docs/latest/general/responsive.html */}
        <div className="doughnut-container">
          <Doughnut />
        </div>

        <div className="wallet-container">
          <Wallet transactions={transactions}/>
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