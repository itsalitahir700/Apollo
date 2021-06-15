import { baseURL } from "../Config";
import axios from "axios";

export const handleGetRequest = async (url) => {
    const response = await axios.get(`${baseURL + url}`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};
