import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductCategories, getProducts } from "../../api/product";

export const loadProducts = createAsyncThunk(
  "product/loadProducts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await Promise.all([getProductCategories(), getProducts()]);

      if (!result.ok) {
        rejectWithValue("Loading products failed.");
      }

      if (!result[0].productCatArr.length && !result[1].productArr.length) {
        rejectWithValue("No products or categories found.");
      } 

      return { categories: result[0], products: result[1] };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
