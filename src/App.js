import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SideNav from './Components/nav/SideNav';
import Dashboard from './Components/dashboard/Dashboard';
import Market from './Components/market/Market';

export default function App() {
  return (
    <Router>
      <section className="App-container">
        <SideNav />
        <section className="main-container">
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/market" component={Market} />
        </section>
      </section>
    </Router>
  );
}
