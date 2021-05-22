import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getLovCampaign = async () => {
  const response = await axios.get(`${baseURL}lovCompaign`, {
    headers: {
      Authorization: "4343344343",
    },
  });
  return response.data;
};

export const postJobs = async (data) => {
  const response = await axios({
    method: "post",
    url: `${baseURL}userManagement/saveCompanyCompaign`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "4343344343",
    },
  });
  if (response.status === 200) {
    toast.success(response.data.messages);
    return response.data;
  } else {
    return false;
  }
};

export const postEditJobs = async (data) => {
  const response = await axios({
    method: "post",
    url: `${baseURL}userManagement/updateCompanyCompaign`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "4343344343",
    },
  });
  if (response.status === 200) {
    toast.success(response.data.messages);
    console.log("this", response.data.data);
    return response.data;
  } else {
    return false;
  }
};
