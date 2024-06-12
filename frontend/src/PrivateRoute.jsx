import React from "react";
import {  Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ( )=> {
  
    const { isAuthenticated} = useSelector((state) => state.user);
    return isAuthenticated ? <Outlet /> : <Navigate to="/how-to-use" />;
};

