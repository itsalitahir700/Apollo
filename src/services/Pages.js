import { baseURL } from "../Config";
import axios from "axios";

export const getAllMenuPages = async (moduleCode) => {
    const response = await axios.get(`${baseURL}getMenuPages/${moduleCode}`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};
