import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
    children: React.ReactNode;
    allowedRoles: string;
}

// this is called route guard
const ProtectedRoutes = ({ children, allowedRoles }: ProtectedRoutesProps) => {
const user=useSelector((state:any)=>state.user)
const dispatch=useDispatch()

    if (!user) {
        return <Navigate to='/login' />;
    }
    try {
        if (user.role === allowedRoles) {
            return children;
        }
        else return <h1>You are not authorized</h1>
    } catch (error) {
        dispatch({type:"LOGOUT"})
        return <Navigate to='/login' replace/>
    }
};

export default ProtectedRoutes