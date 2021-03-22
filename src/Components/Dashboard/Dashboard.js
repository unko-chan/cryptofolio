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

import {
  findMinPeriodBalance,
  findAllCurrencyOwnings,
  sumAllOwnings,
} from '../../helpers/CurrencyPricings';

import './dashboard.scss';
import { currencyColors } from '../../helpers/pieChartHelper';

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [totalBalance, setTotalBalance] = useState({});
  const [currencyBalances, setCurrencyBalances] = useState([]);
  const [currencies, setCurrencies] = useState(['BTC', 'ETH', 'LTC']);

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
    // getUsers();

    setCurrencies(allCurrencies);

    getUserTransactions(1)
    .then(transactions => setTransactions(transactions));

    findAllCurrencyOwnings(currencies)
    .then(res => {
      setCurrencyBalances(res);
      return sumAllOwnings(res);
    })
    .then(res => {
      setTotalBalance(res);
    })

  }, []);
  
  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1> {user} Dashboard </h1>
        <div></div>
      </div>
      <section className="top-section">
        <div className="doughnut-container">
          <Doughnut />
        </div>

        <div className="wallet-container">
          {
            transactions && totalBalance ?
            <div className="chart-container">
              <Wallet
                transactions={transactions}
                totalBalance={totalBalance}
              />
            </div> :
            <div> Loading! </div>
          }
        </div>

      </section>

      <section className="middle-section">
        {
          transactions && totalBalance && currencyBalances ?
          <div className="chart-container">
            <Charts 
              transactions={transactions} 
              totalBalance={totalBalance}
              currencyBalances={currencyBalances}
            />
          </div> :
          <div> Loading! </div>
        }
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