import dispatchWrapper from "../dispatchWrapper";

export const setAppError = (error) => {
    return dispatchWrapper("SET_ERROR", error);
};

export const resetAppError = () => {
    return dispatchWrapper("RESET_ERROR");
};
