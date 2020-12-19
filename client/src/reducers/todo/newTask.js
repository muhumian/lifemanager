// import moment from "moment";

const initTask = {
    title: '',
    description: {
        title: '',
        subtasks: []
    }
};

export default function (state = initTask, action) {
    switch (action.type) {
        case "SET_TITLE":
            return {...state, title: action.payload};
        case "SET_DESCRIPTION":
            return {...state, description: {...state.description, title: action.payload}};
        case "SET_DATE":
            return {...state, date: action.payload};
        case "SET_SUB_TASKS":
            return {...state, description: {...state.description, subtasks: action.payload}};
        case "SET_EMPTY":
            return {
                title: '',
                description: {
                    title: '',
                    subtasks: []
                }
            };
        case "SET_TASK": {
            return action.payload;
        }
        default:
            return state;
    }
}

