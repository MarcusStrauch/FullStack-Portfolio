import axios from "axios";

export const getUserCart = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_ENDPOINT}cart/user`,
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const createUserCart = async (userId) => {
  try {
    const response = await axios({
      method: "POST",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_ENDPOINT}cart/user`,
      data: { userId },
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const upsertCartItems = async (cartId, items) => {
  try {
    const response = await axios({
      method: "POST",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_ENDPOINT}cart/${cartId}/items`,
      data: { items: items },
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const deleteCartItem = async (cartId, cartProductId) => {
  try {
    const response = await axios({
      method: "DELETE",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_ENDPOINT}cart/${cartId}/items/${cartProductId}`,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const checkout = async (cartId) => {
  try {
    const response = await axios({
      method: "POST",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_ENDPOINT}cart/${cartId}/checkout`,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

