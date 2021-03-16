import './App.scss';
import SideNav from './components/nav/SideNav.js';
import Dashboard from './components/dashboard/Dashboard'

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
