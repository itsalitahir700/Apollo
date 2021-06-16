import { getDocuments as gDocuments, addDocuments as aDocuments } from "../../services/Documents";
import { GETDOCUMENTSSUCCESS, GETDOCUMENTSERROR } from "../slices/documentsSlice";

export const getDocuments = async (rtaCode) => async (dispatch) => {
    const res = await gDocuments(rtaCode);
    if (res) {
        dispatch(GETDOCUMENTSSUCCESS(res));
        return res;
    } else {
        dispatch(GETDOCUMENTSERROR(res));
    }
};

export const addDocuments = async (data) => async (dispatch) => {
    const res = await aDocuments(data);
    return res;
};
