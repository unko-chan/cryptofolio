import './App.scss';
import React from 'react';
import SideNav from './components/nav/SideNav';
import Dashboard from './components/dashboard/Dashboard'


function App() {
  return (
    <section className="App-container">
      <SideNav />

      <section className="main-container">
        <Dashboard />
      </section>
    </section>
  );
}

export default App;
