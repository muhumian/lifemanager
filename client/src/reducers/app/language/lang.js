const initLang = {
    code: localStorage.getItem("i18nextLng")|| "us"
};

export default function (state = initLang, action) {
    switch (action.type) {
        case "SET_LANG":
            // localStorage.setItem("dark_mode", action.payload);
            // return {...state, mode: action.payload};
        default:
            return state;
    }
}
