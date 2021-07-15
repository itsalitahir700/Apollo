import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getUsers = async () => {
    try {
        const response = await axios.get(`${baseURL}getAllUsers`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });

        return response?.data?.data;
    } catch (error) {
        toast.warn(error?.response?.data?.messages || "Something went wrong");
    }
};

export const updateUserPassword = async (userId) => {
    try {
        const response = await axios({
            method: "post",
            url: `${baseURL}userManagement/changeUserPassword`,
            data: { userId },
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        toast.success(response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        toast.warn(error?.response?.data?.messages || "Something went wrong");
    }
};
