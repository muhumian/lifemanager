import {resetAppError, setAppError} from "../../../../actions/App/errorActions";
import {getTasks, setTasks} from "../../../../actions/todo/tasks/getTasks";
import {setAlertNew} from "../../../../actions/Alert/alerts";

export const StartTasksSetter = async (dispatch) => {

    dispatch(resetAppError());
    const tasks = await getTasks();
    dispatch(setTasks(tasks.data.content));

    if (tasks.data.result === false && tasks.errorMessage !== null) {
        dispatch(setAppError(tasks.data.errorMessage));
    }
};

export const TasksChecker = async (response, dispatch) => {
    if (response.data.result) {
        await StartTasksSetter(dispatch);
    } else {
        dispatch(setAlertNew('error', true));
        dispatch(setAppError(response.data.errorMessage));
    }
};
