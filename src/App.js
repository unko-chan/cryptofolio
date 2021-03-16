import './App.scss';
import SideNav from './Components/SideNav/SideNav';
import Dashboard from './Components/Dashboard/Dashboard'

function App() {
  return (
    <section className="App-container">
      <SideNav />

      <section className="main-container">
        <Dashboard />
      </section>
    </section>
  );
}

export default App;
