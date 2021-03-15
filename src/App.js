import './App.scss';
import SideNav from './Components/Nav/SideNav';
import Doughnut from "./charts/doughnut";
import VoteLine from "./charts/performanceChartLine"

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
          <VoteLine />

          <Doughnut />
        </div>
      </header>
    </div>
  );
  }

export default App;