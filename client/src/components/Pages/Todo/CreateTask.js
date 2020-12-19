import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

//actions
import {setTitle, setEmpty} from "../../../actions/todo/tasks/setTask";
import {AddToDB} from "../../../actions/todo/DB/CRUD_Task";
import {setAlert, setAlertNew} from "../../../actions/Alert/alerts";

//icons
import {VscChromeClose} from "react-icons/vsc";
import {BiErrorCircle} from "react-icons/bi";

//styles
import {Input, Form, AddCancelContainer, Error} from '../../../styles/App/Elements/Form';
// import Input from '../../../styles/App/Form/Input';
import {Title} from '../../../styles/App/Elements/Form';
// import {Form} from '../../../styles/App/Elements/Form';
// import {AddCancelContainer} from "../../../styles/App/Elements/Form";
import Textarea from "../../../styles/App/Elements/Textarea";

//functions
// import Alert from "../../../functions/alert";
import {RedirectTo} from "../../App/Functions/redirect";
import {GlobalError} from "../../../styles/App/Elements/GlobalError";
import {resetAppError, setAppError} from "../../../actions/App/errorActions";
import validator from "validator";
import {checkTask} from "./functions/taskValidation";

//components
// import DatePicker from "./Datepicker";
// import MultiSelect from "./MultiSelect";

const CreateTask = () => {

    let history = useHistory();
    const {t} = useTranslation('todo/task');
    const startTyping = useRef();

    const dispatch = useDispatch();
    const task = useSelector(state => state.task);
    const app_err = useSelector(state => state.app);
    const [error, setError] = useState({title: false, description: false, subtasks: false});

    useEffect(() => {
        startTyping.current.focus();

        return () => {
            dispatch(setEmpty());
        }
    }, []);

    async function newTask(e) {
        e.preventDefault();

        if (checkTask(task, setError)) {
            const response = await AddToDB(task);

            if (response.data.result) {
                dispatch(setAlertNew('success', true));
                RedirectTo(history, '/todo');
            } else {
                dispatch(setAlertNew('error', true));
                dispatch(setAppError(response.data.errorMessage));
            }
        }
    }

    useEffect(() => {
        return () => dispatch(resetAppError());
    }, []);

    return (
        <>
            <Title>{t("newTask.title")} 👍</Title>

            <Form onSubmit={async (e) => await newTask(e)} noValidate>
                <Input
                    name="title"
                    type="text"
                    ref={startTyping}
                    value={task.title}
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    placeholder={t("newTask.i_task_name")}/>
                {
                    error.title && <Error>{error.title}</Error>
                }
                <Textarea task={task} dispatch={dispatch}/>

                <AddCancelContainer btnType="back">
                    <button className="back" onClick={(e) => {
                        e.preventDefault();
                        RedirectTo(history, '/todo');
                    }}>
                        <VscChromeClose/>
                    </button>
                    <button className="ok expand" type="submit">{t("btns.btn_save")}</button>
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

export default CreateTask;
