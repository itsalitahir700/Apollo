import { getClaimant } from "../../services/Claimant";
import { GETCLAIMANTSUCCESS, GETCLAIMANTERROR } from "../slices/claimantSlice";

export const getClaimantDetails = (rtaCode) => async (dispatch) => {
    const res = await getClaimant(rtaCode);
    if (res) {
        dispatch(GETCLAIMANTSUCCESS(res));
        return res;
    } else {
        dispatch(GETCLAIMANTERROR(res));
    }
};
