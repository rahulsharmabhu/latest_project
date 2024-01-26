import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RibbonLayout from "../../layouts/ribbon-layout";

export function ModuleRouter(moduleRoute) {
  const { subRoutes } = moduleRoute;
  const mainPage = subRoutes?.length ? subRoutes[0].path : "";

  const getLayout = (route) => {
    switch (route?.type) {
      case "ribbon-layout":
        return (
          <Route
            key={route.path}
            path={route.path + (route.pathParam || "/*")}
            element={
              <RibbonLayout
                {...route}
                path={route.path}
                component={<route.component />}
              />
            }
          />
        );
      default:
        return (
          <Route
            key={route.path}
            path={route.path + (route.pathParam || "/*")}
            element={<route.component />}
          />
        );
    }
  };

  return (
    <Routes>
      {subRoutes?.map((route, i) => getLayout(route))}
      <Route path={"*"} element={<Navigate to={mainPage} />} />
    </Routes>
  );
}
