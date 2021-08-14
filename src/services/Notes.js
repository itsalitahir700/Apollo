import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const notesService = {
    getNotes: async (getNotesService, rtaCode) => {
        let res;
        await axios({
            method: "GET",
            url: `${baseURL + getNotesService}/${rtaCode}`,
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
    },

    addNotes: async (addNotesService, note) => {
        let res;
        await axios({
            method: "post",
            url: `${baseURL + addNotesService}`,
            data: note,
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
    },
};
