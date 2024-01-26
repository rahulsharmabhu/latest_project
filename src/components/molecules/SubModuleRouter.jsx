import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export function SubModuleRouter(moduleRoute) {

  const { subRoutes } = moduleRoute;
  const mainPage = subRoutes?.length ? subRoutes[0].path : "";

  return (
    <Routes>
      {subRoutes?.map((route, i) => (
        <Route
          key={i}
          path={route.path + (route.pathParam || "")}
          element={<route.component />}
        />
      ))}

      <Route path={"*"} element={<Navigate to={mainPage} />} />
    </Routes>
  );
}
