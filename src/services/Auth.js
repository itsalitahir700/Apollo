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
            console.log("login service ::", response);
            toast.success(response.data.messages);
            res = response.data.data;
        })
        .catch((err) => {
            console.log("login service err ::", err?.response?.data?.messages);
            toast.warn(err?.response?.data?.messages);
            res = false;
        });
    return res;
};
