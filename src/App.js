import './App.scss';
import SideNav from './Components/Nav/SideNav';
import PerformanceLine from './charts/performanceLine';
import PerformanceBar from './charts/performanceBar';
import PerformanceMultiLine from './charts/performanceMultiLine';
import Dashboard from './Components/Dashboard/Dashboard'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="main-container">
          <div className="side-nav">
            <SideNav />
          </div>
          
        </div>
        
        <div class="chart-container">
          <Dashboard />
          <PerformanceMultiLine />
          {/* <PerformanceLine />
          <PerformanceBar /> */}
        </div>

          </header>
    </div>
  );
}

export default App;
