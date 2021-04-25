import React from "react";
import Todo from "./components/Todo";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import ProductFeature from "./feature/Product";
import CartFeature from "./feature/Cart";
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: "/products",
    exact: false,
    main: () => <ProductFeature />,
  },
  {
    path: "/todo",
    exact: false,
    main: () => <Todo />,
  },
  {
    path: "/cart",
    exact: false,
    main: () => <CartFeature />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;
