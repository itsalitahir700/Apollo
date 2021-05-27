import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const postRta = async (data, token) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}rta/addNewRtaCase`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJsYUp3dElkIiwiaWF0IjoxNjIyMDQ1MDE2LCJzdWIiOiIxMCIsImlzcyI6ImxhSnd0SXNzdWVyIiwiY29tcGFueUNvZGUiOiI5IiwidXNlck5hbWUiOiJNdXJ0YXphMSIsInVzZXJDb2RlIjoiMTAiLCJleHAiOjE2MjIwOTkwMTZ9.AcC3XDRvjkQLt1Y6nH6OnVg6Ins01kcPgsJizYMBlrE",
        },
    });
    if (response.status === 200) {
        toast.success(response.data.messages);
        return response;
    } else {
        return false;
    }
};
export const getRta = async (token) => {
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
