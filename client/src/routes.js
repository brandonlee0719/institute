import React, {
  Suspense,
  Fragment,
  lazy,
} from "react";

import {
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

// import AdminGuard from "./components/AdminGuard"; //Might be used in future

import ClientPortalGuard from "./components/ClientPortalGuard";
import GuestGuard from "./components/GuestGuard";
import LoadingScreen from "./components/LoadingScreen";
import DashboardLayout from "./layouts/Dashboard";
import MainLayout from "./layouts/MainLayout";


export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} key={new Date()} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);


const routes = [
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("./screens/errors/NotFound")),
  },
  {
    path: "/client",
    guard: ClientPortalGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: "/client/home",
        component: lazy(() => import("./screens/Client/Home")),
      },
      {
        exact: true,
        path: "/client/account",
        component: lazy(() => import("./screens/Client/Account")),
      },
      {
        exact: true,
        path: "/client/search",
        component: lazy(() => import("./screens/Client/Search")),
      },
      {
        exact: true,
        path: "/client/consult",
        component: lazy(() => import("./screens/Client/Consult")),
      },
      {
        exact: true,
        path: "/client/certificate",
        component: lazy(() => import("./screens/Client/Certificate")),
      },
      {
        exact: true,
        path: "/client/contact",
        component: lazy(() => import("./screens/Client/Contact")),
      },
      {
        path: "/client/class/:pathParam",
        component: lazy(() => import("./screens/Client/Class")),
      },
    ],
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: MainLayout,
    path: "/login_client",
    component: lazy(() => import("./screens/Auth/Login")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: MainLayout,
    path: "/signup_client",
    component: lazy(() => import("./screens/Auth/SignUp")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: MainLayout,
    path: "/forgot-password",
    component: lazy(() => import("./screens/ForgetPassword")),
  },
  {
    exact: true,
    guard: GuestGuard,
    layout: MainLayout,
    path: "/password/reset/:userId/:token",
    component: lazy(() => import("./screens/ResetPassword")),
  },
  {
    path: "/avonEHR",
    component: () => {
      window.location.href = "www.avonehr.com";
      return null;
    },
  },
  {
    path: "*",
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: "/",
        component: lazy(() => import("./screens/Home")),
      },
      {
        component: () => <Redirect to="/404" />,
      },
    ],
  },
];

export default routes;
