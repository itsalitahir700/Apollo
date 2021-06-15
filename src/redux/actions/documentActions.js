import { getDocuments as gDocuments } from "../../services/Documents";
import { GETDOCUMENTSSUCCESS, GETDOCUMENTSERROR } from "../slices/documentsSlice";

export const getDocuments = (rtaCode) => async (dispatch) => {
    const res = await gDocuments(rtaCode);
    if (res) {
        dispatch(GETDOCUMENTSSUCCESS(res));
        return res;
    } else {
        dispatch(GETDOCUMENTSERROR(res));
    }
};
