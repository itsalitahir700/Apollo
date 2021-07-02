import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

export const getLovRole = async () => {
    const response = await axios.get(`${baseURL}lovRole`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
};

export const postUsers = async (data) => {
    try {
        const response = await axios({
            method: "post",
            url: `${baseURL}userManagement/saveCompanyUser`,
            data: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        toast.success(response.data.messages);
        return response.data;
    } catch (error) {
        toast.warn(error.response.data.messages);

        return error.response;
    }
};
