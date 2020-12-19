import dispatchWrapper from "../../dispatchWrapper";

export const setTitle = (title) => {
    return dispatchWrapper("SET_TITLE", title);
};

export const setDescription = (description) => {
    return dispatchWrapper("SET_DESCRIPTION", description);
};

export const setDate = (date) => {
    return dispatchWrapper("SET_DATE", date);
};

export const addSubTask = (subtasks, newSubTask) => {
    let subtasks_clone = subtasks;
    subtasks_clone.push({title: newSubTask, status: true});
    return dispatchWrapper("SET_SUB_TASKS", subtasks_clone);
};

export const deleteSubTask = (subtasks, index) => {
    const subtasks_clone = subtasks.filter((s, i) => i !== index);
    return dispatchWrapper("SET_SUB_TASKS", subtasks_clone);
};

export const updateSubtaskStatus = (subtasks, index) => {
    subtasks[index].status = !subtasks[index].status;
    return dispatchWrapper("SET_SUB_TASKS", subtasks);
};

export const setEmpty = () => {
    return dispatchWrapper("SET_EMPTY");
};

export const setTask = (task) => {
    return dispatchWrapper("SET_TASK",task);
};


