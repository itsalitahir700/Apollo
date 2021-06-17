import { notesService } from "../../services/Notes";
import { GETNOTESSUCCESS, GETNOTESERROR } from "../slices/notesSlice";

export const getNotes = (rtaCode) => async (dispatch) => {
    const res = await notesService.getNotes(rtaCode);
    if (res) {
        dispatch(GETNOTESSUCCESS(res));
        return res;
    } else {
        dispatch(GETNOTESERROR(res));
    }
};

export const addNotes = (note) => async (dispatch) => {
    const res = await notesService.addNotes(note);
    return res;
};
