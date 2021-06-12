import { getMessages as gMessages, addMessages as aMessages } from "../../services/messages";
import { GETMESSAGESSUCCESS, GETMESSAGESERROR } from "../slices/messageSlice";

export const getMessages = (rtaCode) => async (dispatch) => {
    const res = await gMessages(rtaCode);
    if (res) {
        dispatch(GETMESSAGESSUCCESS(res));
        return res;
    } else {
        dispatch(GETMESSAGESERROR(res));
    }
};

export const addMessages = (note) => async (dispatch) => {
    const res = await aMessages(note);
    return res;
};
