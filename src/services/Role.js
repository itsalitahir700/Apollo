import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getAllRole = async (token) => {
  const response = await axios.get(`${baseURL}getRoles`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const postRole = async (data, token) => {
  const response = await axios({
    method: "post",
    url: `${baseURL}userManagement/saveRole`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (response.status === 200) {
    toast.success(response.data.messages);
    return response;
  } else {
    return false;
  }
};
