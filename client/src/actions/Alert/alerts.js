import dispatchWrapper from "../dispatchWrapper";

export const setAlert = (state) => {
    return dispatchWrapper("SET_ALERT", {messageKey: state.messageKey, status: state.status});
};

export const setAlertNew = (messageKey, status) => {
    return dispatchWrapper("SET_ALERT", {messageKey: messageKey, status: status});
};
