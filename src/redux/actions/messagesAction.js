import { getMessages as gMessages } from "../../services/Messages";
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
