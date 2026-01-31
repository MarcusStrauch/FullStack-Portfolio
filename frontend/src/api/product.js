import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_ENDPOINT}product`,
    });

    return response.data
  } catch (err) {
    throw err.response.data;
  }
};

export const getProductCategories = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_ENDPOINT}product/categories`,
    });

    return response.data
  } catch (err) {
    throw err.response.data;
  }
};

