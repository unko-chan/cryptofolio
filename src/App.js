import './App.scss';
<<<<<<< HEAD
import SideNav from './components/nav/SideNav.js';
import Dashboard from './components/dashboard/Dashboard'
=======
import SideNav from './Components/SideNav/SideNav';
import Dashboard from './Components/Dashboard/Dashboard'
>>>>>>> cb8d8b6af6189850cd4b619f7ce38412fb542342

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
