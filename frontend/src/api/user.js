import axios from "axios";

export const localLogIn = async () => {
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