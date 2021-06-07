import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getClaimant = async (rtaCode) => {
    let res;
    await axios({
        method: "GET",
        url: `${baseURL}rta/getAuthRtaCase/${rtaCode}`,
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
