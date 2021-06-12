import { baseURL } from "../Config";
import axios from "axios";

export const getRoleRights = async (roleCode) => {
    const response = await axios.get(`${baseURL}getRolesRights/${roleCode}`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};

export const getlovModule = async () => {
    const response = await axios.get(`${baseURL}lovModule`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};

export const getlovPages = async (code) => {
    const response = await axios.get(`${baseURL}getMenuPages/${code}`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};
