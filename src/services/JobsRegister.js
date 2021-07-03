import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getLovCampaign = async () => {
    const response = await axios.get(`${baseURL}lovCompaign`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};

export const postJobs = async (data) => {
    try {
        const response = await axios({
            method: "post",
            url: `${baseURL}userManagement/saveCompanyCompaign`,
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

export const postEditJobs = async (data) => {
    try {
        const response = await axios({
            method: "post",
            url: `${baseURL}userManagement/updateCompanyCompaign`,
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
