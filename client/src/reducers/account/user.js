const initUser = JSON.parse(localStorage.getItem('user_local')) || null;

export default function (state = initUser, action) {
    switch (action.type) {
        case "SET_USER":
            localStorage.setItem('user_local', JSON.stringify(action.payload));
            return action.payload;
        case "LOG_OUT":
            localStorage.removeItem('user_local');
            return null;
        default:
            return state;
    }
}

