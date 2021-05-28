import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const getClaimant = async (data) => {
    let res;
    await axios({
        method: "GET",
        url: `${baseURL}rta/getAuthRtaCase/32`,
        headers: {
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
