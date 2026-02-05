import { createSelector, createSlice } from "@reduxjs/toolkit";
import { loadProducts } from "./productSliceThunks";
import Fuse from "fuse.js";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    productCategory: [],
    getProductsStatus: {
      pending: false,
      success: false,
      failed: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ----------GET PRODUCTS---------- */
      .addCase(loadProducts.pending, (state) => {
        state.getProductsStatus.pending = true;
        state.getProductsStatus.success = false;
        state.getProductsStatus.failed = false;
      })
      .addCase(loadProducts.fulfilled, (state, { payload }) => {
        state.productCategory = payload.categories.productCatArr;
        state.product = payload.products.productArr;
        state.getProductsStatus.pending = false;
        state.getProductsStatus.success = true;
        state.getProductsStatus.failed = false;
      })
      .addCase(loadProducts.rejected, (state) => {
        state.getProductsStatus.pending = false;
        state.getProductsStatus.success = false;
        state.getProductsStatus.failed = true;
      });
    /* ----------GET PRODUCTS---------- */
  },
});

export const selectProductsByCategory = createSelector(
  [(state) => state.product.product, (state, categoryId) => categoryId],
  (product, categoryId) =>
    product.filter((item) => item.productCategoryId === categoryId)
);
export const selectCategoryData = createSelector(
  [(state) => state.product.productCategory, (state, category) => category],
  (productCategory, category) =>
    productCategory.find(
      (item) => item.name.toLowerCase() === category.toLowerCase()
    )
);
export const selectOneProduct = createSelector(
  [(state) => state.product.product, (state, productId) => productId],
  (product, productId) =>
    product.find((item) => Number(item.productId) === Number(productId))
);
export const selectProductsByArray = createSelector(
  [(state) => state.product.product, (state, filterArray) => filterArray],
  (product, filterArray) =>
    product.filter(
      (item) =>
        !!filterArray.find(
          (arrayItem) => Number(arrayItem.productId) === Number(item.productId)
        )
    )
);
export const selectProductIdAndName = createSelector(
  [(state) => state.product.product],
  (product) =>
    product.map((item) => {
      return { productId: item.productId, name: item.name };
    })
);
export const searchProductsByTitle = createSelector(
  [(state) => state.product.product, (state, searchTerm) => searchTerm],
  (product, searchTerm) => {
    const options = {
      keys: ["name"],
    };
    const fuse = new Fuse(product, options);
    if (!searchTerm) {
      return [];
    }
    return fuse.search(searchTerm).map((result) => result.item);
  }
);

export const selectProducts = (state) => state.product.product;
export const selectProductCategories = (state) => state.product.productCategory;
export const selectGetProductsStatus = (state) => state.product.getProductsStatus;

export default productSlice.reducer;
