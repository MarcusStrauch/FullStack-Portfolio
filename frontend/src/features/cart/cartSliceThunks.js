import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkout,
  createUserCart,
  deleteCartItem,
  getUserCart,
  upsertCartItems,
} from "../../api/cart";
import { getCSRFToken } from "../user/userSliceThunks";
import { getUserOrders } from "../order/orderSliceThunks";

export const addItemsToUserCart = createAsyncThunk(
  "cart/addItemsToUserCart",
  async (itemsToAdd, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const savedCartId = state.cart.cart.cartId;
      if (!savedCartId) {
        dispatch(mergeUserCart())
          .unwrap()
          .then((result) => {
            
          });
      }

    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const mergeUserCart = createAsyncThunk(
  "cart/mergeUserCart",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();

      const localCartProducts = state.cart.cart.products;

      const savedCartResult = await getUserCart();
      if (!savedCartResult.ok) {
        rejectWithValue("Error getting cart items");
      }
      const savedCart = { cartId: null, products: [] };
      if (!savedCartResult.cartsProductsArr) {
        await dispatch(getCSRFToken());
        const createCartResult = await createUserCart(state.user.user.userId);
        if (!createCartResult.ok) {
          rejectWithValue("Error creating cart");
        }
        savedCart.cartId = createCartResult.cart.cartId;
        savedCart.products = [];
      } else {
        savedCart.cartId = savedCartResult.cartsProductsArr[0].cartId;
        savedCart.products = savedCartResult.cartsProductsArr[0].products;
      }

      const savedCartId = savedCart.cartId;
      const savedCartProducts = savedCart.products;

      if (!localCartProducts.length) {
        return savedCart;
      }

      const mergedCart = localCartProducts.map((product) => ({
        productId: Number(product.productId),
        quantity: Number(product.quantity),
      }));

      savedCartProducts.forEach((savedItem) => {
        const foundIndex = mergedCart.findIndex(
          (item) => Number(item.productId) === Number(savedItem.productId)
        );
        if (foundIndex === -1) {
          mergedCart.push({
            productId: Number(savedItem.productId),
            quantity: Number(savedItem.quantity),
            cartProductId: Number(savedItem.cartProductId),
          });
        } else {
          mergedCart[foundIndex].cartProductId = savedItem.cartProductId;
        }
      });

      await dispatch(getCSRFToken());
      const itemsToUpsert = mergedCart.map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
      }));
      const upsertResult = await upsertCartItems(savedCartId, itemsToUpsert);
      if (!upsertResult.ok) {
        rejectWithValue("Error while merging cart");
      }
      savedCart.products = upsertResult.cartItems;
      
      return savedCart;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const removeItemFromUserCart = createAsyncThunk(
  "cart/removeItemsFromUserCart",
  async (itemToRemove, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const savedCartId = state.cart.cart.cartId;
      await dispatch(getCSRFToken());
      const deleteResult = await deleteCartItem(savedCartId, itemToRemove);
      return deleteResult;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const savedCartId = state.cart.cart.cartId;
      await dispatch(getCSRFToken());
      const checkoutResult = await checkout(savedCartId);
      if (!checkoutResult.ok) {
        rejectWithValue("failed checkout");
      }
      dispatch(getUserOrders());
      return checkoutResult;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
