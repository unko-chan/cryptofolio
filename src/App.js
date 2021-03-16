import './App.scss';
import SideNav from './components/nav/SideNav';
import Dashboard from './components/dashboard/Dashboard'
import TradingWidget from './components/TradingWidget';


function App() {
  return (
    <section className="App-container">
      <SideNav />

      <section className="main-container">
        <TradingWidget />
        <Dashboard />
      </section>
    </section>
  );
}

export default App;
