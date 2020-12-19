const initApp = {
    error: {
        status: false,
        errorMessage: null
    }
};

export default function (state = initApp, action) {
    switch (action.type) {
        case "SET_ERROR":
            return {
                status: true,
                errorMessage: action.payload
            };
        case "RESET_ERROR":
            return {
                status: false,
                errorMessage: null
            };
        default:
            return state;
    }
}
