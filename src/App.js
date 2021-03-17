import './App.scss';
import SideNav from './components/nav/SideNav';
import Dashboard from './components/dashboard/Dashboard'
import TradingWidget from './components/TradingWidget';
import ArticleList from './components/news/ArticleList'

function App() {
  return (
    <section className="App-container">
      <div>
      <SideNav />
      </div>
      <section className="main-container">
        <ArticleList />
         
      </section>
    </section>
  );
}

export default App;
