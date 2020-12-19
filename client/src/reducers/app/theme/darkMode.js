const initDarkMode = {
    mode: localStorage.getItem("dark_mode") === "true" || false
};

export default function (state = initDarkMode, action) {
    switch (action.type) {
        case "SET_DARK_MODE":
            localStorage.setItem("dark_mode", action.payload);
            return {...state, mode: action.payload};
        default:
            return state;
    }
}
