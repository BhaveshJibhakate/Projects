import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import OwnerDashboard from "./components/OwnerDashboard";
import DeliveryDashboard from "./components/DeliveryDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import SearchBar from "./components/SearchBar";
import AdminDashboard from "./components/AdminDashboard";

function App(): any {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoutes allowedRoles="user">
              <UserDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoutes allowedRoles="owner">
              <OwnerDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/delivery-dashboard"
          element={
            <ProtectedRoutes allowedRoles="delivery_person">
              <DeliveryDashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/searchbar" element={<SearchBar/>}/>
      </Routes>
    </Router>
  );
}

export default App;
