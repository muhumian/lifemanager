import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

//actions
import {setAlert, setAlertNew} from "../../../actions/Alert/alerts";
import {getTask} from "../../../actions/todo/tasks/getTasks";
import {setTitle, setDate, setEmpty, setTask} from "../../../actions/todo/tasks/setTask";
import {DeleteTaskDB, UpdateTaskDB} from "../../../actions/todo/DB/CRUD_Task";

//icons
import {BiErrorCircle} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
// import {VscChromeClose} from "react-icons/vsc";

//styles
import {Input, Form, AddCancelContainer, Error} from '../../../styles/App/Elements/Form';
import {Title} from '../../../styles/App/Elements/Form';
import {VscClose} from "react-icons/vsc";
import Textarea from "./Textarea";

//functions
import {RedirectTo} from "../../App/Functions/redirect";
import {HelperTaskDelete} from "./functions/taskDelete";
import {GlobalError} from "../../../styles/App/Elements/GlobalError";
import {setAppError} from "../../../actions/App/errorActions";
import {checkTask} from "./functions/taskValidation";

//components


const EditTask = () => {

    let history = useHistory();
    const {id} = useParams();
    const {t} = useTranslation('todo/task');

    const app_err = useSelector(state => state.app);
    const [error, setError] = useState({title: false, description: false, subtasks: false});

    // -----------------------EDIT TASK-----------------------

    const dispatch = useDispatch();
    const task = useSelector(state => state.task);

    async function editTask(e) {
        e.preventDefault();

        if (checkTask(task, setError)) {
            const response = await UpdateTaskDB(task);

            if (response.data.result) {
                dispatch(setAlertNew('success', true));
                RedirectTo(history, '/todo');
            } else {
                dispatch(setAlertNew('error', true));
                dispatch(setAppError(response.data.errorMessage));
            }
        }
    }

    const deleteTask = async (e) => {
        e.preventDefault();
        await HelperTaskDelete(await DeleteTaskDB(id), history, '/todo', dispatch);
    };

    useEffect(() => {

        async function start() {
            const response = await getTask(id);

            if (response.data.result){
                dispatch(setTask(response.data.content));
            } else {
                dispatch(setAlertNew('error',true));
                dispatch(setAppError(response.data.errorMessage));
            }
        }

        start();

        return () => {
            dispatch(setEmpty());
        }
    }, []);

    return (
        <>
            <Title>{t("editTask.title")} ✍️</Title>
            <Form noValidate>
                <Input
                    name="title"
                    type="text"
                    value={task.title}
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    placeholder={t("editTask.i_task_name")}/>
                {
                    error.title && <Error>{error.title}</Error>
                }
                <Textarea task={task} dispatch={dispatch}/>

                <AddCancelContainer>
                    <button className="back" onClick={(e) => {
                        deleteTask(e);
                        RedirectTo(history, '/todo');
                    }}>
                        <AiOutlineDelete/>
                    </button>
                    <button className="back" type="submit" onClick={(e) => {
                        e.preventDefault();
                        RedirectTo(history, '/todo');
                    }}>
                        <VscClose/>
                    </button>
                    <button type="submit" className="ok expand"
                            onClick={(e) => editTask(e)}>{t("btns.btn_edit")}</button>
                </AddCancelContainer>
                {
                    error.description && <Error>{error.description}</Error>
                }
                {
                    error.subtasks && <Error>{error.subtasks}</Error>
                }
            </Form>
            {
                app_err.status && <GlobalError><BiErrorCircle/><span>{app_err.errorMessage}</span></GlobalError>
            }
        </>
    )
};

export default EditTask;
