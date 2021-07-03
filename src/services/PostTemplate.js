import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const handlePostRequest = async (data, url) => {
    try {
        const response = await axios({
            method: "post",
            url: `${baseURL + url}`,
            data: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        });
        toast.success(response.data.messages);
        return response.data;
    } catch (error) {
<<<<<<< HEAD
        toast.warn(error?.response?.data?.messages || "Something went wrong");
=======
        toast.warn(error.response.data.messages || "Something went wrong !!");
>>>>>>> 62bd29594747867738e94a2f0e448d490cbd923b

        return error.response;
    }
};
