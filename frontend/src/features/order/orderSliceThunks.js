import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders } from "../../api/order";

export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getOrders();
      return result.orderProductArr;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
