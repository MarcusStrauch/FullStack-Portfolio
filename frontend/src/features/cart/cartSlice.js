import { createSlice } from "@reduxjs/toolkit";
import { checkoutCart, mergeUserCart } from "./cartSliceThunks";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      products: [],
    },
    userCartInfo: null,
    mergeCartStatus: {
      pending: false,
      success: false,
      failed: false,
    },
    checkoutCartStatus: {
      pending: false,
      success: false,
      failed: false,
    },
  },
  reducers: {
    addItemToCart: (state, action) => {
      const foundIndex = state.cart.products.findIndex(
        (item) => Number(item.productId) === Number(action.payload.productId)
      );
      if (foundIndex === -1) {
        state.cart.products.push(action.payload);
      } else {
        state.cart.products[foundIndex] = {
          ...state.cart.products[foundIndex],
          quantity: action.payload.quantity,
        };
      }
    },
    updateCartItem: (state, action) => {
      const foundIndex = state.cart.products.findIndex(
        (item) => Number(item.productId) === Number(action.payload.itemToUpdate)
      );
      state.cart.products[foundIndex] = {
        ...state.cart.products[foundIndex],
        ...action.payload.updatedProps,
      };
    },
    removeCartItem: (state, action) => {
      state.cart.products = state.cart.products.filter(
        (product) => product.productId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      /* ----------MERGE CART---------- */
      .addCase(mergeUserCart.pending, (state) => {
        state.mergeCartStatus.pending = true;
        state.mergeCartStatus.success = false;
        state.mergeCartStatus.failed = false;
      })
      .addCase(mergeUserCart.fulfilled, (state, { payload }) => {
        state.cart.cartId = payload.cartId;
        state.cart.products = payload.products;
        state.mergeCartStatus.pending = false;
        state.mergeCartStatus.success = true;
        state.mergeCartStatus.failed = false;
      })
      .addCase(mergeUserCart.rejected, (state) => {
        state.mergeCartStatus.pending = false;
        state.mergeCartStatus.success = false;
        state.mergeCartStatus.failed = true;
      })
      /* ----------MERGE CART---------- */

      /* ----------MERGE CART---------- */
      .addCase(checkoutCart.pending, (state) => {
        state.checkoutCartStatus.pending = true;
        state.checkoutCartStatus.success = false;
        state.checkoutCartStatus.failed = false;
      })
      .addCase(checkoutCart.fulfilled, (state, { payload }) => {
        state.cart = {
          products: [],
        };
        state.checkoutCartStatus.pending = false;
        state.checkoutCartStatus.success = true;
        state.checkoutCartStatus.failed = false;
      })
      .addCase(checkoutCart.rejected, (state) => {
        state.checkoutCartStatus.pending = false;
        state.checkoutCartStatus.success = false;
        state.checkoutCartStatus.failed = true;
      });
    /* ----------MERGE CART---------- */
  },
});

export const selectCart = (state) => state.cart.cart;

export const { addItemToCart, updateCartItem, removeCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
