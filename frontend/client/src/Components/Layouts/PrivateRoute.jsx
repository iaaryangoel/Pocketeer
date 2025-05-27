import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token exists, allow access
  if (token) {
    return children;
  }

  // If no token, redirect to login
  return <Navigate to="/login" />;
};

export default PrivateRoute;
