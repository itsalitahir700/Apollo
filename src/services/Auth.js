import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const login = async (data) => {
    let res;
    await axios({
        method: "post",
        url: `${baseURL}login`,
        data: data,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            toast.success(response.data.messages);
            res = response.data.data;
        })
        .catch((err) => {
            toast.warn(err?.response?.data?.messages || "Something went wrong!!");
            res = false;
        });
    return res;
};

export const refreshToken = async (data) => {
    let res;
    await axios({
        method: "get",
        url: `${baseURL}refreshToken`,
        data: data,
        headers: {
             Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            localStorage.setItem("token",response.data.data);
        })
        .catch((err) => {
          res = false;
          console.err(err);
        });
    return res;
};

export const updatePassword = async (password) => {
    let res;
    await axios({
        method: "post",
        url: `${baseURL}userManagement/changePassword`,
        data: { password },
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
    })
        .then((response) => {
            toast.success(response.data.data);
            res = response?.data?.data;
        })
        .catch((err) => {
            toast.warn(err?.response?.data?.messages || "Something went wrong");
            res = false;
        });
    return res;
};
