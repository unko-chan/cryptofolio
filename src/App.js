import './App.scss';
import SideNav from './Components/nav/SideNav';
import Dashboard from './Components/dashboard/Dashboard'
import TradingWidget from './Components/TradingWidget';


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
