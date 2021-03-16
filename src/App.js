import './App.scss';
import SideNav from './components/nav/SideNav.js';
import Dashboard from './components/dashboard/Dashboard'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="main-container">
          <div className="side-nav">
            <SideNav />
          </div>
        </div>
        
        <div>
          <Dashboard />
        </div>

        </header>
    </div>
  );
}

export default App;
