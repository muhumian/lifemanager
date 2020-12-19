import axios from 'axios';
import {getHeader} from '../conf';

export const AddToDB = async (task) => {
    return await axios.post('/api/tasks/add', task, getHeader());
};

export const UpdateTaskDB = async (task) => {
    return await axios.post('/api/task/update/', {task}, getHeader());
};

export const UpdateTaskStatusDB = async (id, status) => {
    return await axios.post('/api/task/update/status', {id, status}, getHeader());
};

export const DeleteTaskDB = async (id) => {
    return await axios.delete(`/api/task/delete/${id}`, getHeader());
};
