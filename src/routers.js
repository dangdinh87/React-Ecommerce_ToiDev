import React from "react";
import NotFound from "./components/NotFound";
import Todo from "./components/Todo";
import CartFeature from "./feature/Cart";
import ProductFeature from "./feature/Product";
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <ProductFeature />,
  },
  {
    path: "/products",
    exact: false,
    main: () => <ProductFeature />,
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
