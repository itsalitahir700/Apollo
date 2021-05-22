import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const postModule = async (data, token) => {
  const response = await axios({
    method: "post",
    url: `${baseURL}userManagement/saveModule`,
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

export const postPage = async (data, token) => {
  const response = await axios({
    method: "post",
    url: `${baseURL}userManagement/saveModulePage`,
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

export const getAllModules = async (token) => {
  const response = await axios.get(`${baseURL}getAllModules`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
