import './App.scss';
import Doughnut from "./charts/doughnut";
import Wallet from "./wallet/index";

function App() {
  return (
    <section>
      <div class="chart-container">
        <Doughnut />
      </div>

      <div class="wallet-container">
        <Wallet />
      </div>
    </section>
  );
}

export default App;