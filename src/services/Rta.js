import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getRta = async () => {
    try {
        const response = await axios.get(`${baseURL}rta/getAuthRtaCases`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return response?.data?.data;
    } catch (error) {
        toast.warn(error?.response?.data?.messages || "Something went wrong");
    }
};

export const postRta = async (data) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}rta/addNewRtaCase`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
    });
    if (response.status === 200) {
        await toast.success(response.data.messages);
        return response.data
    } else {
        return false;
    }
};

export const updataRta = async (data) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}rta/updateRtaCase`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
    });
    if (response.status === 200) {
        toast.success(response.data.messages);
        return response?.data?.data;
    } else {
        return false;
    }
};

export const getPassengers = async (rtacode) => {
    try {
        const response = await axios.get(`${baseURL}rta/getAuthRtaCasePassengers/${rtacode}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return response?.data?.data;
    } catch (error) {}
};

export const performActionOnRtaFromDirectIntro = async (data) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}rta/performActionOnRtaFromDirectIntro`,
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

export const performActionOnRta = async (data) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}rta/performActionOnRta`,
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

export const getAddress = async (url, postcode) => {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("Key", "CJ71-FW71-AK98-JH56");
    data.append("Text", postcode);
    data.append("IsMiddleware", "false");
    data.append("Container", postcode);
    data.append("Origin", "");
    data.append("Countries", "GBR");
    data.append("Limit", "10");
    data.append("Language", "en-gb");
    try {
        const response = await axios({
            method: "post",
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const getFurtherAddressService = async (url, data) => {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("Key", "CJ71-FW71-AK98-JH56");
    data.append("Text", data.Text);
    data.append("IsMiddleware", "false");
    data.append("Container", data.Id);
    data.append("Origin", "");
    data.append("Countries", "GBR");
    data.append("Limit", "10");
    data.append("Language", "en-gb");
    try {
        const response = await axios({
            method: "post",
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const getAddressValues = async (url, id) => {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("Key", "CJ71-FW71-AK98-JH56");
    data.append("Id", id);
    data.append("Field1Format", "");
    try {
        const response = await axios({
            method: "post",
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const getMakeModelService = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return response?.data;
    } catch (error) {
        toast.warn(error?.response?.data?.messages || "Something went wrong");
    }
};
