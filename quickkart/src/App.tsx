import "./App.css";
import Navbar from "./Component/Navbar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Form from "./Form";

function App() {

  return (
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
