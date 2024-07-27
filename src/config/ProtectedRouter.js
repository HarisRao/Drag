import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const { isLogin } = useSelector((state) => state?.authReducer);
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRouter;
