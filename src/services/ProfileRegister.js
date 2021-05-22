import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getLovUserCategory = async (token) => {
  const response = await axios.get(`${baseURL}lovUserCategory`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const postProfile = async (data, token) => {
  console.log("service :: yes");
  const response = await axios({
    method: "post",
    url: `${baseURL}userManagement/saveCompanyProfile`,
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

export const postEditProfile = async (data, token) => {
  console.log("service :: yes");
  const response = await axios({
    method: "post",
    url: `${baseURL}userManagement/updateCompanyProfile`,
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

export const getCompanyData = async () => {
  const response = await axios.get(`${baseURL}getAllCompaniesProfile`, {
    headers: {
      Authorization: "4343344343",
    },
  });
  console.log("called servcice", response.data);
  return response.data;
};
