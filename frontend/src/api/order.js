import axios from "axios";

export const getOrders = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_ENDPOINT}order/user`,
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
