import React from "react";
import { Navigate } from "react-router-dom";
import { UseAppContext } from "../storeContext/storeContext";

const ProtectedRoutes = ({ allowedRoles, children }) => {
    const {sucess, info} = UseAppContext();
 
    if (!sucess) {
        return <Navigate to="/register" />;
    }

    if (!info?.user?.role) {
        return <div>Loading...</div>;
      }

    if (!allowedRoles.includes(info?.user?.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoutes;
