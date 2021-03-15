import './App.scss';
import SideNav from './Components/Nav/SideNav';
import Doughnut from "./charts/doughnut";
import Dashboard from './Components/Dashboard/Dashboard';
import Bar from './charts/dynamicBar';


function App() {
  return (
  <div className="App" >
    <header className="App-header">
      <div className="side-nav">
        <SideNav />
      </div>
  
      <div className="main-container">
        <div>
          <Dashboard />
        </div>
      </div>

      </header>
  </div>


)
  }

export default App;