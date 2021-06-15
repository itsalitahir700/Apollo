import { baseURL } from "../Config";
import axios from "axios";

export const getCircumstances = async () => {
    const response = await axios.get(`${baseURL}lovCircumstances`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};

export const getInjuryClassification = async () => {
    const response = await axios.get(`${baseURL}lovInjuryClaims`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};

export const getSolicitorsForRta = async () => {
    const response = await axios.get(`${baseURL}lovSolicitorsForRta`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};

export const getCompanyWiseUser = async (code) => {
    const response = await axios.get(`${baseURL}lovCompanyWiseUSer/${code}`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response.data;
};

export const getLovUserCategory = async (code) => {
    const response = await axios.get(`${baseURL}lovUserCategory`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response?.data?.data;
};

export const getLovCompany = async (code) => {
    const response = await axios.get(`${baseURL}lovCompany`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response?.data?.data;
};

export const getlovStatus = async (code) => {
    const response = await axios.get(`${baseURL}lovStatus`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response?.data?.data;
};

export const getlovCompaign = async (code) => {
    const response = await axios.get(`${baseURL}lovCompaign`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    return response?.data?.data;
};
