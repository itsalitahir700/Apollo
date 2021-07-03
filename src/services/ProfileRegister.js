import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getLovUserCategory = async () => {
    const response = await axios.get(`${baseURL}lovUserCategory`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};

export const postProfile = async (data) => {
    try {
        const response = await axios({
            method: "post",
            url: `${baseURL}userManagement/saveCompanyProfile`,
            data: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        });
        toast.success(response.data.messages);
        return response.data;
    } catch (error) {
        toast.warn(error?.response?.data?.messages || "Something went wrong");

        return error.response;
    }
};

export const postEditProfile = async (data) => {
    console.log("service :: yes");
    const response = await axios({
        method: "post",
        url: `${baseURL}userManagement/updateCompanyProfile`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
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
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};
