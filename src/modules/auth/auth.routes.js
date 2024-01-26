import { AuthModule } from "./AuthModule";
import Signin from "./signin";


export const AuthRoute = {
  title: "Auth",
  path: "/auth",
  // icon: HomeIcon,
  component: AuthModule,
  guard: false,
  subRoutes: [
    { path: "signin", component: Signin, },

  ],
};
