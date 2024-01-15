import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      // console.log(action);
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, action) => {
      const itemId = action.payload;
      const currentCart = state.cartItems.find((item) => item.id === itemId);
      currentCart.amount = currentCart.amount + 1;
    },
    decrease: (state, action) => {
      const itemId = action.payload;
      const currentCart = state.cartItems.find((item) => item.id === itemId);
      currentCart.amount = currentCart.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
      });
      state.total = total;
      state.amount = amount;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
