import { createSelector } from "@reduxjs/toolkit";

const cartItemSelector = (state) => state.cart.cartItem;

export const cartItemCountSelector = createSelector(
  cartItemSelector,
  (cartItems) => cartItems.reduce((count, item) => count + item.quantity, 0)
);

export const cartTotalCountSelector = createSelector(
  cartItemSelector,
  (cartItems) =>
    cartItems.reduce(
      (count, item) => count + item.product.salePrice * item.quantity,
      0
    )
);
