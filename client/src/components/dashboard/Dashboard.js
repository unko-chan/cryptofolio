import { React, useEffect, useState } from 'react';
import Doughnut from '../charts/Doughnut';
import Transaction from './PastTransaction';
import Wallet from './Wallet';
import Charts from './Charts';
import Currency from './CurrentUserCurrency';

import {
  getUserTransactions,
  getCurrencies,
} from '../../helpers/transactionHelper.js';

import {
  findMinPeriodBalance,
  findAllCurrencyOwnings,
  sumAllOwnings,
} from '../../helpers/CurrencyPricings';

import './styles/dashboard.scss';
import { currencyColors } from '../../helpers/pieChartHelper';

const Dashboard = () => {
  const [user, setUser] = useState('');
  const [transactions, setTransactions] = useState([]);

  const [totalBalance, setTotalBalance] = useState({});
  const [currencyBalances, setCurrencyBalances] = useState([]);
  const [currencies, setCurrencies] = useState(['BTC', 'ETH', 'LTC']);

  const getUsers = async () => {
    const data = await fetch("http://localhost:5432/users", {
      headers: { "Content-Type": "application/json"}
    }).then( async (response) => {
      const users = await response.json()
      return users;
    });
    setUser(data[0].username);
  };

  // only run requests when the page loads
  useEffect(() => {
    // getUsers();

    getUserTransactions(1).then((transactions) =>
      setTransactions(transactions)
    );

    findAllCurrencyOwnings(currencies)
      .then((res) => {
        setCurrencyBalances(res);
        return sumAllOwnings(res);
      })
      .then((res) => {
        setTotalBalance(res);
      });
  }, []);

  return (
    <section>
      <div className="page-header">Portfolio</div>
      
      <section className="wrapper1">

        {transactions && totalBalance && currencyBalances ? (
          <div className="chart-container">
            <header className="header-text">Performance</header>
            <Charts
              transactions={transactions}
              totalBalance={totalBalance}
              currencyBalances={currencyBalances}
              className="chart"
            />
          </div>
        ) : (
          <div> Loading! </div>
        )}

        <div className="wallet-container">
          <header className="header-text">Value</header>
          {transactions && totalBalance ? (
            <Wallet transactions={transactions} totalBalance={totalBalance} />
            ) : (
            <div> Loading! </div>
          )}
        </div >

        <div className="doughnut-container">
          <header className="header-text">Allocation</header>
          <Doughnut
            totalBalance={totalBalance}
            currencyBalances={currencyBalances}
            className="doughnut"
          />
        </div>

        <div className="currency-container">
          <header className="header-text">Wallet</header>
          <Currency
            currencies={currencies}
            totalBalance={totalBalance}
            currencyBalances={currencyBalances}
          />
        </div>

        <div className="transaction-container">
          <header className="header-text">Recent Transactions</header>
          <Transaction transactions={transactions} />
        </div>
      </section>
    </section>
  )
};

export default Dashboard;