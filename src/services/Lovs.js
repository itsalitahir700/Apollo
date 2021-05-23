import { baseURL } from "../Config";
import axios from "axios";

export const getCircumstances = async (token) => {
    const response = await axios.get(`${baseURL}lovCircumstances`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
};

export const getInjuryClassification = async (token) => {
    const response = await axios.get(`${baseURL}lovInjuryClaims`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
};
