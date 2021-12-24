/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartState, ICartPayload } from '../shared/interfaces';

const initialState: ICartState = {
  products: [],
  quantity: 0,
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ICartPayload>) => {
      state.products.push(action.payload);
      state.quantity += action.payload.quantity;
      state.total += action.payload.quantity * action.payload.price;
    },
    removeProduct: (state, action: PayloadAction<ICartPayload>) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      state.products.splice(index, 1);
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.quantity * action.payload.price;
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    }
  }
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
