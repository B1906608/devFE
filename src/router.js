import React from "react";
import Home from "./Home/home";
import NavBar from "./page/NavBar/navbar";
import Login from "./page/Login/login";

const routes = [
  {
    path: "/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/navbar",
    exact: true,
    main: () => <NavBar />,
  },
  {
    path: "/login",
    exact: true,
    main: () => <Login />,
  },
];

export default routes;
