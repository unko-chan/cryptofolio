import './App.scss';
import SideNav from './components/nav/SideNav';
import Dashboard from './components/dashboard/Dashboard'
import TradingWidget from './components/TradingWidget';
import ArticleList from './components/news/ArticleList'
import CurrencyDetails from './components/currency_details/CurrencyDetails'

function App() {
  return (
    <section className="App-container">
      <div>
      <SideNav />
      </div>
      <section className="main-container">
         
      </section>
    </section>
  );
}

export default App;
