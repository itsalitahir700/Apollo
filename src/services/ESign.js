import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const eService = {
    getESigns: async (rtaCode) => {
        let res;
        await axios({
            method: "POST",
            url: `${baseURL}rta/getESignFields`,
            headers: {
                "Content-Type": "application/json",
            },
            data: { rtaCode },
        })
            .then((response) => {
                res = response.data.data;
            })
            .catch((err) => {
                toast.warn(err?.response?.data?.messages);
                res = false;
            });
        return res;
    },
    addESign: async (data) => {
        let res;
        await axios({
            method: "POST",
            url: `${baseURL}rta/addESign`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        })
            .then((response) => {
                res = response.data.data;
                toast.success(response.data.data.message);
            })
            .catch((err) => {
                toast.warn(err?.response?.data?.messages);
                res = false;
            });
        return res;
    },
};
