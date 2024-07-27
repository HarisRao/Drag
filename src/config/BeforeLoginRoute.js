import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const BeforeLoginRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state?.authReducer);
  if (isLogin) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};
export default BeforeLoginRoute;
