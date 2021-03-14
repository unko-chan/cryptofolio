import logo from './logo.svg';
import './App.css';
import { Line } from 'react-chartjs-2';
import Dynamic from './test';
import SideNav from './SideNav';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40, 38, 42, 66, 100, 101, 108, 102, 38, 65, 59, 80, 81, 56, 55, 40, 38, 42, 66, 100, 101, 108, 102, 38, 65, 59, 80, 81, 56, 55, 40, 38, 42, 66, 100, 101, 108, 102, 38, 65, 59, 80, 81, 56, 55, 40, 38, 42, 66, 100, 101, 108, 102, 38]
    }
  ]
};

function App() {
  return (
    <div className="App">
      <header className="App-header">

  <div className="main-container">
    <div className="side-nav">
      <SideNav />
    </div>



  </div>
      </header>
      <div>
        
      </div>
    </div>
    
  );
}

export default App;
