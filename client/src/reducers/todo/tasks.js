const initTasks = [];

export default function (state = initTasks, action) {
    switch (action.type) {
        case "SET_TASKS":
            return action.payload;
        default:
            return state;
    }
}

