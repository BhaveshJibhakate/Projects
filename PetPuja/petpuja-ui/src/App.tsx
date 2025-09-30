import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import OwnerDashboard from "./components/OwnerDashboard";
import DeliveryDashboard from "./components/DeliveryDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App(): any {
  return (
    <Router>
      <Navbar />
      <Routes>
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
      </Routes>
    </Router>
  );
}

export default App;
