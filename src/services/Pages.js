import { baseURL } from "../Config";
import axios from "axios";

export const getAllMenuPages = async (moduleCode, token) => {
  const response = await axios.get(`${baseURL}getMenuPages/${moduleCode}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
