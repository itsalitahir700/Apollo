import { getClaimant } from "../../services/Claimant";
import { performActionOnRtaFromDirectIntro, performActionOnRta } from "../../services/Rta";
import { GETCLAIMANTSUCCESS, GETCLAIMANTERROR, PERFORMACTIONSUCCESS, PERFORMACTIONERROR } from "../slices/claimantSlice";

export const getClaimantDetails = (url, code) => async (dispatch) => {
    const res = await getClaimant(url, code);
    if (res) {
        dispatch(GETCLAIMANTSUCCESS(res));
        return res;
    } else {
        dispatch(GETCLAIMANTERROR(res));
    }
};
export const ActionOnRtaFromDirectIntro = (data) => async (dispatch) => {
    const res = await performActionOnRtaFromDirectIntro(data);
    if (res) {
        dispatch(PERFORMACTIONSUCCESS(res));
        return res;
    } else {
        dispatch(PERFORMACTIONERROR(res));
    }
};
export const ActionOnRta = (data) => async (dispatch) => {
    const res = await performActionOnRta(data);
    if (res) {
        dispatch(PERFORMACTIONSUCCESS(res));
        return res;
    } else {
        dispatch(PERFORMACTIONERROR(res));
    }
};
