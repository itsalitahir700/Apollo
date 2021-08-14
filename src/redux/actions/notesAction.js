import { notesService } from "../../services/Notes";
import { GETNOTESSUCCESS, GETNOTESERROR } from "../slices/notesSlice";

export const getNotes = (getNotesService, rtaCode) => async (dispatch) => {
    const res = await notesService.getNotes(getNotesService, rtaCode);
    if (res) {
        dispatch(GETNOTESSUCCESS(res));
        return res;
    } else {
        dispatch(GETNOTESERROR(res));
    }
};

export const addNotes = (addNotesService, note) => async (dispatch) => {
    const res = await notesService.addNotes(addNotesService, note);
    return res;
};
