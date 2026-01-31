import { createSlice } from "@reduxjs/toolkit";
import { getUserOrders } from "./orderSliceThunks";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    getUserOrdersStatus: {
      pending: false,
      success: false,
      failed: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ----------MERGE CART---------- */
      .addCase(getUserOrders.pending, (state) => {
        state.getUserOrdersStatus.pending = true;
        state.getUserOrdersStatus.success = false;
        state.getUserOrdersStatus.failed = false;
      })
      .addCase(getUserOrders.fulfilled, (state, { payload }) => {
        state.order = [...payload]
        state.getUserOrdersStatus.pending = false;
        state.getUserOrdersStatus.success = true;
        state.getUserOrdersStatus.failed = false;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.getUserOrdersStatus.pending = false;
        state.getUserOrdersStatus.success = false;
        state.getUserOrdersStatus.failed = true;
      })
      /* ----------MERGE CART---------- */
  },
});

export const selectOrders = (state) => state.order.order;

export default orderSlice.reducer;