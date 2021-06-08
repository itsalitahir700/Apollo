import { getNotes as gNotes, addNotes as aNotes } from "../../services/Notes";
import { GETNOTESSUCCESS, GETNOTESERROR } from "../slices/notesSlice";

export const getNotes = (rtaCode) => async (dispatch) => {
    const res = await gNotes(rtaCode);
    if (res) {
        dispatch(GETNOTESSUCCESS(res));
        return res;
    } else {
        dispatch(GETNOTESERROR(res));
    }
};

export const addNotes = (note) => async (dispatch) => {
    const res = await aNotes(note);
    return res;
};
