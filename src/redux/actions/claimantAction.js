import { getClaimant } from "../../services/Claimant";
import { GETCLAIMANTSUCCESS, GETCLAIMANTERROR } from "../slices/claimantSlice";

export const getClaimantDetails = () => async (dispatch) => {
    console.log("FETCHING..");
    const res = await getClaimant();
    if (res) {
        dispatch(GETCLAIMANTSUCCESS(res));
        return res;
    } else {
        dispatch(GETCLAIMANTERROR(res));
    }
};
