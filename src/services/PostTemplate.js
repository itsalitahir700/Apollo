import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const handlePostRequest = async (data, url) => {
    try {
        const response = await axios({
            method: "post",
            url: `${baseURL + url}`,
            data: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        });
        toast.success(response.data.messages);
        return response.data;
    } catch (error) {
        toast.warn(error.response.data.messages);

        return error.response;
    }
};
