import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getDocuments = async (rtaCode) => {
    let res;
    await axios({
        method: "GET",
        url: `${baseURL}rta/getAuthRtaCasedocuments/${rtaCode}`,
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            res = response.data.data;
        })
        .catch((err) => {
            toast.warn(err.message);
            res = false;
        });
    return res;
};

export const addDocuments = async (data) => {
    let res;
    await axios({
        method: "POST",
        url: `${baseURL}rta/addRtaDocument`,
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        data,
    })
        .then((response) => {
            res = response.data.data;
        })
        .catch((err) => {
            toast.warn(err.message);
            res = false;
        });
    return res;
};
