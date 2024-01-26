import React from "react";
import { ModuleRouter } from "../../components/molecules/ModuleRouter";

import { AuthRoute } from "./auth.routes";

export function AuthModule() {
  return (
    <>
      {AuthRoute.subRoutes && (
        <ModuleRouter subRoutes={AuthRoute.subRoutes} path={AuthRoute.path} />
      )}
    </>
  );
}
