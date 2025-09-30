import { jwtDecode } from "jwt-decode";
import React from "react"
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
    children: React.ReactNode;
    allowedRoles: string;
}

interface MyJwtPayload {
    role: string;
    email:string;
}
// this is called route guard
const ProtectedRoutes = ({ children, allowedRoles }: ProtectedRoutesProps) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to='login' />;
    }
    try {
        const decoded = jwtDecode<MyJwtPayload>(token);
        if (decoded.role === allowedRoles) {
            return children;
        }
        else return <h1>You are not authorized</h1>
    } catch (error) {
        localStorage.removeItem("token")
        return <Navigate to='/login' replace/>
    }
};

export default ProtectedRoutes