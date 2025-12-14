import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import Cart from './screens/Cart';
import MyOrders from './screens/MyOrders';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.js';
import { CartProvider } from './context/CartProvider';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path = "/" element={<Home/>}/>
            <Route exact path = "/login" element={<Login/>}/>
            <Route exact path = "/createuser" element={<Signup/>}/>
            <Route exact path = "/cart" element={<Cart/>}/>
            <Route exact path = "/myorders" element={<MyOrders/>}/>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
