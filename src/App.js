import './App.css';
import Orders from './components/orders';
import Customers from './components/customers';
import Products from './components/products';

function App() {
  return (
    <div className="App">
      <Orders></Orders>
      <Customers></Customers>
      <Products></Products>
    </div>
  );
}

export default App;
