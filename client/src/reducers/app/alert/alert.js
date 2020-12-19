const initLang = {
    messageKey: null,
    status: false
};

export default function (state = initLang, action) {
    switch (action.type) {
        case "SET_ALERT":
            return action.payload;
        default:
            return state;
    }
}
