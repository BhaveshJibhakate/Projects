import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
    children: React.ReactNode;
    allowedRoles: string;
}

// this is called route guard
const ProtectedRoutes = ({ children, allowedRoles }: ProtectedRoutesProps) => {
    
const token=localStorage.getItem("token")
const user=JSON.parse(localStorage.getItem("user") || "null")
const dispatch=useDispatch()

    if (!token) {
        return <Navigate to='/' />;
    }
    try {
        if (user?.role === allowedRoles) {
            return children;
        }
        // else return <h1>You are not authorized</h1>
    } catch (error) {
        dispatch({type:"LOGOUT"})
        return <Navigate to='/' replace/>
    }
};

export default ProtectedRoutes