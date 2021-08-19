import { getClaimant } from "../../services/Claimant";
import { performActionOnRtaFromDirectIntro, performActionOnRta } from "../../services/Rta";
import { handlePostRequest } from "../../services/PostTemplate";
import { GETCLAIMANTSUCCESS, GETCLAIMANTERROR, PERFORMACTIONSUCCESS, PERFORMACTIONERROR, COPYRTATOHIRESUCCESS, COPYRTATOHIREERROR, COPYHIRETORTASUCCESS, COPYHIRETORTAERROR } from "../slices/claimantSlice";

export const getClaimantDetails = (url, code) => async (dispatch) => {
    const res = await getClaimant(url, code);
    if (res) {
        dispatch(GETCLAIMANTSUCCESS(res));
        return res;
    } else {
        dispatch(GETCLAIMANTERROR(res));
    }
};

export const CopyRtatoHire = (data, url) => async (dispatch) => {
    const res = await handlePostRequest(data, url);
    if (res) {
        dispatch(COPYRTATOHIRESUCCESS(res?.data));
        return res;
    } else {
        dispatch(COPYRTATOHIREERROR(res));
    }
};

export const ActionOnRtaFromDirectIntro = (data) => async (dispatch) => {
    const res = await performActionOnRtaFromDirectIntro(data);
    if (res) {
        dispatch(PERFORMACTIONSUCCESS(res.data.data));
        return res;
    } else {
        dispatch(PERFORMACTIONERROR(res));
    }
};
export const ActionOnHire = (data, url) => async (dispatch) => {
    const res = await handlePostRequest(data, url);
    if (res) {
        dispatch(PERFORMACTIONSUCCESS(res?.data));
        return res;
    } else {
        dispatch(PERFORMACTIONERROR(res));
    }
};
export const ActionOnRta = (data) => async (dispatch) => {
    const res = await performActionOnRta(data);
    if (res) {
        dispatch(PERFORMACTIONSUCCESS(res.data.data));
        return res;
    } else {
        dispatch(PERFORMACTIONERROR(res));
    }
};
export const CopyHiretoRta = (data, url) => async (dispatch) => {
    const res = await handlePostRequest(data, url);
    if (res) {
        dispatch(COPYHIRETORTASUCCESS(res?.data));
        return res;
    } else {
        dispatch(COPYHIRETORTASUCCESS(res));
    }
};
