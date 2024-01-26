import Home from ".";
import RibbonLayout from "../../layouts/ribbon-layout";

const RouteList = {
  title: "PD Home",
  path: "/",
  // icon: HomeIcon,
  component: Home,
  guard: true,
  subRoutes:[]
};

export const CommonRoutes = {
  title: RouteList.title,
  path: RouteList.path,
  // icon: HomeIcon,
  component: ()=>(
    <RibbonLayout
      {...RouteList}
      path={RouteList.path}
      component={<RouteList.component />}
    />
  ),
  guard: RouteList.guard,
  subRoutes: RouteList.subRoutes,
};
