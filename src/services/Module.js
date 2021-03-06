import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const postModule = async (data) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}userManagement/saveModule`,
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

export const postPage = async (data) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}userManagement/saveModulePage`,
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

export const getAllModules = async () => {
    const response = await axios.get(`${baseURL}getAllModules`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};
