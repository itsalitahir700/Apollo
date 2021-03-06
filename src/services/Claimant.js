import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getClaimant = async (url, code) => {
    let res;
    await axios({
        method: "GET",
        url: `${baseURL + url + code}`,
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            res = response.data.data;
        })
        .catch((err) => {
            toast.warn(err?.response?.data?.messages);
            res = false;
        });
    return res;
};
