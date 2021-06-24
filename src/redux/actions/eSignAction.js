import { eService } from "../../services/ESign";
import { GETEFIELDSSUCCESS, GETEFIELDSERROR } from "../slices/eSignSlice";

export const getESigns = async (rtaCode) => async (dispatch) => {
    const res = await eService.getESigns(rtaCode);
    if (res) {
        dispatch(GETEFIELDSSUCCESS(res));
        return res;
    } else {
        dispatch(GETEFIELDSERROR(res));
    }
};

export const addESign = async (data) => {
    const res = await eService.addESign(data);
    if (res) {
        return res;
    } else {
        return false;
    }
};
