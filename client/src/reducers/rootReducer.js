import {combineReducers} from "redux";

import darkMode from "./app/theme/darkMode";
import lang from "./app/language/lang";
import alertNotification from "./app/alert/alert";
import tasks from "./todo/tasks";
import task from "./todo/newTask";
import app from "./app/appReducer";

import user from './account/user';

const rootReducer = combineReducers({
    app: app,
    darkMode: darkMode,
    currentLanguage: lang,
    alert: alertNotification,
    tasks: tasks,
    task: task,
    user: user
});

export default rootReducer;
