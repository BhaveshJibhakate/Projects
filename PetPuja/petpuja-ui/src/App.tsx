import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
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
import HomePage from "./components/HomePage";
import { useSelector } from "react-redux";

function App(): any {
  const user = useSelector((state: any) => state.user);

  return (
    <Router>
      {user && <Navbar user={user}/>}
      <Routes>
        <Route path="/" element={<HomePage />} />
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
