import axios from 'axios';
import dispatchWrapper from "../../dispatchWrapper";
import {getHeader} from '../conf';

export const getTasks = async () => {
    return await axios.get('/api/tasks/list', getHeader());
};

export const getTask = async (id) => {
    return await axios.get(`/api/task/${id}`, getHeader());
};

export const setTasks = (tasks) => {
    return dispatchWrapper("SET_TASKS", tasks);
};
