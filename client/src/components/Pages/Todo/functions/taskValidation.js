import validator from "validator";

export const checkTask = (task, setError) => {
    setError({title: false, description: false, subtasks: false});

    if (!validator.isLength(task.title.trim(), {min: 3, max: 50})) {
        setError({title: "Task name can't be shorter than 3 characters and longer than 50 characters"});
        return false;
    } else if (!validator.isLength(task.description.title, {max: 150})) {
        setError({description: "Description can't be longer than 150 characters"});
        return false;
    } else if (task.description.subtasks.length > 5){
        setError({description: "Maximum number of subtasks 5"});
        return false;
    }

    return true;
};
