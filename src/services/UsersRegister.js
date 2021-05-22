import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getLovRole = async () => {
  const response = await axios.get(`${baseURL}lovRole`, {
    headers: {
      Authorization: "4343344343",
    },
  });
  return response.data;
};

export const postUsers = async (data) => {
  const response = await axios({
    method: "post",
    url: `${baseURL}userManagement/saveCompanyUser`,
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
