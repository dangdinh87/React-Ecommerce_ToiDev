import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // id , product{}, quantity
    cartItem: [],
    isShowMiniCart: false,
  },
  reducers: {
    showMiniCart(state) {
      state.isShowMiniCart = true;
    },
    hideMiniCart(state) {
      state.isShowMiniCart = false;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItem.findIndex((x) => x.id === newItem.id);

      if (index >= 0) {
        state.cartItem[index].quantity += newItem.quantity;
      } else {
        state.cartItem.push(newItem);
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItem.findIndex((x) => x.id === id);
      console.log(index);
      if (index >= 0) {
        state.cartItem[index].quantity = quantity;
      }
    },
    removeCart(state, action) {
      const id = action.payload;
      const index = state.cartItem.findIndex((x) => x.id === id);
      state.cartItem.splice(index, 1);
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  showMiniCart,
  hideMiniCart,
  addToCart,
  removeCart,
  setQuantity,
} = actions;
export default reducer;
