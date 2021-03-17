import './App.scss';
import React from 'react';
import SideNav from './components/nav/SideNav';
import Dashboard from './components/dashboard/Dashboard'
import Market from './components/market/Market';

function App() {
  return (
    <section className="App-container">
      <SideNav />

      <section className="main-container">
        {/* <Dashboard /> */}
        <Market />
      </section>
    </section>
  );
}

export default App;
