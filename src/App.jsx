import Home from "./screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ContextReducer from "./components/ContextReducer";
import Cart from "./components/Cart";
import MyOrders from "./components/MyOrders";

function App() {
  return (
    <ContextReducer>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/createuser" element={<Signup />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/myorders" element={<MyOrders />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ContextReducer>
  );
}

export default App;
