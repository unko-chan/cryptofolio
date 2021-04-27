import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideNav from './components/nav/SideNav';
import Dashboard from './components/dashboard/Dashboard';
import Market from './components/market/Market';
import Exchange from './components/exchange/Exchange';
import ArticleList from './components/news/ArticleList'

export default function App() {
  return (
    <Router>
      <section className="App-container">
          <SideNav />
        <section className="main-container">
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/market" component={Market} />
          <Route exact path="/rebalance" component={Exchange} />
          <Route exact path="/news" component={ArticleList} />
        </section>
      </section>
    </Router>
  );
}
