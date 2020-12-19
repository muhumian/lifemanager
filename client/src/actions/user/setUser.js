import dispatchWrapper from "../dispatchWrapper";

export const setUser = (user) => {
    // console.log(user);
    return dispatchWrapper("SET_USER", user);
};

export const ResetUser = () => {
    return dispatchWrapper("LOG_OUT");
};
