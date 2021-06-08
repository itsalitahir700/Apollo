import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

export const getRta = async () => {
    try {
        const response = await axios.get(`${baseURL}rta/getAuthRtaCases`, {
            headers: {
                Authorization: token,
            },
        });
        return response?.data?.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const postRta = async (data) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}rta/addNewRtaCase`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
    if (response.status === 200) {
        toast.success(response.data.messages);
        return response;
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
            Authorization: token,
        },
    });
    if (response.status === 200) {
        toast.success(response.data.messages);
        return response;
    } else {
        return false;
    }
};

export const getPassengers = async (rtacode) => {
    try {
        const response = await axios.get(`${baseURL}rta/getAuthRtaCasePassengers/${rtacode}`, {
            headers: {
                Authorization: token,
            },
        });
        return response?.data?.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const performActionOnRtaFromDirectIntro = async (data) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}rta/performActionOnRtaFromDirectIntro`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
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
            Authorization: token,
        },
    });
    if (response.status === 200) {
        toast.success(response.data.messages);
        return response;
    } else {
        return false;
    }
};
