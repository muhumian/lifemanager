const validator = require('validator');

const taskValidation = (task) => {

    if (!validator.isLength(task.title.trim(), {min: 3, max: 50})) {
        return "Task name can't be shorter than 3 characters and longer than 50 characters";
    } else if (!validator.isLength(task.description.title, {max: 150})) {
        return "Description can't be longer than 150 characters";
    } else if (task.description.subtasks.length > 5) {
        return "Maximum number of subtasks 5";
    }

    return false;
};

module.exports = {taskValidation};
