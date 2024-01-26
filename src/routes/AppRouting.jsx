import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import { RouteGuard } from "../modules/auth/components/RouteGuard";
import { useAppSelector } from "../app-redux/hooks";
import { isLogin } from "../app-redux/auth/authSlice";
import NotFound from "../modules/home/not-found";

const AppRouting = () => {
  const isLoggedIn = useAppSelector(isLogin);
  return (
    <Routes>
      {ROUTES.map((route, i) => (
        <Route
          key={i}
          path={route.path + "/*"}
          element={
            route.guard ? (
              <RouteGuard path={route.path} redirectPath="/auth">
                {<route.component />}
              </RouteGuard>
            ) : (
              <>
                {!isLoggedIn ? (
                  <>
                    <route.component />
                  </>
                ) : (
                  <Navigate replace to="/" />
                )}
              </>
            )
          }
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouting;
