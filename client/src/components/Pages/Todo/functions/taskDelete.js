import {StartTasksSetter} from "./taskSetter";
import {setAlertNew} from "../../../../actions/Alert/alerts";
import {RedirectTo} from "../../../App/Functions/redirect";
import {setAppError} from "../../../../actions/App/errorActions";

export const HelperTaskDelete = async (response, history, home, dispatch) => {
    if (response.data.result) {
        await StartTasksSetter(dispatch);
        dispatch(setAlertNew('success', true));
        RedirectTo(history, home);
    } else {
        dispatch(setAlertNew('error', true));
        dispatch(setAppError(response.data.errorMessage));
    }
};
