import { baseURL } from "../Config";
import axios from "axios";

export const getRoleRights = async (roleCode, token) => {
  const response = await axios.get(`${baseURL}getRolesRights/${roleCode}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const getlovModule = async (token) => {
  const response = await axios.get(`${baseURL}lovModule`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const getlovPages = async (code) => {
  const response = await axios.get(`${baseURL}getMenuPages/${code}`, {
    headers: {
      Authorization: "token",
    },
  });
  return response.data;
};
