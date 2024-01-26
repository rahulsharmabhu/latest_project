import React from "react";
import { isLogin } from "../../../app-redux/auth/authSlice";
import { useAppSelector } from "../../../app-redux/hooks";
import { Navigate } from "react-router-dom";

export function RouteGuard(props) {
  const isLoggedIn = useAppSelector(isLogin);
  return isLoggedIn ? props.children : <Navigate replace to={props.redirectPath} />;
}
