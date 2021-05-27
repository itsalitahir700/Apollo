import { baseURL } from "../Config";
import axios from "axios";

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
