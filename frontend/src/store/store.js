import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../features/user/userSlice";
import productSliceReducer from "../features/product/productSlice";
import applicationSliceReducer from "../features/application/applicationSlice";
import cartSliceReducer from "../features/cart/cartSlice";
import orderSliceReducer from "../features/order/orderSlice";

const combinedReducers = combineReducers({
  user: userSliceReducer,
  product: productSliceReducer,
  cart: cartSliceReducer,
  order: orderSliceReducer,
  application: applicationSliceReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: combinedReducers,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
};
