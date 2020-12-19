import React from 'react';
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router";

//actions
import {getTasks, setTasks} from "../../../actions/todo/tasks/getTasks";
import {DeleteTaskDB, UpdateTaskDB} from "../../../actions/todo/DB/CRUD_Task";
import {setEmpty} from "../../../actions/todo/tasks/setTask";
import {setAlert, setAlertNew} from "../../../actions/Alert/alerts";

//icons
import {VscChromeClose} from "react-icons/vsc";
import {AiOutlineDelete} from "react-icons/ai";
import {MdModeEdit} from "react-icons/md";
import {BiSubdirectoryRight} from "react-icons/bi";
import {BiCheck} from 'react-icons/bi'

//styles
import {AddCancelContainer} from "../../../styles/App/Elements/Form";
import {IconBorder} from "../../../styles/App/Shared/icons";
import {DetailInfo, DetailTitle, SubIcon, SubtasksContainer} from "../../../styles/App/Shared/subtasks";

//functions
import {RedirectTo} from "../../App/Functions/redirect";
import {StartTasksSetter, TasksChecker} from "./functions/taskSetter";

//components
import PopUpContainer from "../../App/Popup/Popup";
import {setAppError} from "../../../actions/App/errorActions";
import {HelperTaskDelete} from "./functions/taskDelete";


const PopUpDetails = ({detailTask, setDetailTask, pathBack}) => {

    const {t} = useTranslation('todo/task');
    const dispatch = useDispatch();
    let history = useHistory();

    const deleteTask = async (e) => {
        e.preventDefault();

        const response = await DeleteTaskDB(detailTask._id);
        setDetailTask(false);
        await HelperTaskDelete(response, history, pathBack.home, dispatch);
    };

    const subtaskClicked = async (task, index) => {
        task.description.subtasks[index].status = !task.description.subtasks[index].status;
        await TasksChecker(await UpdateTaskDB(task), dispatch);
    };

    return (
        <PopUpContainer>
            <DetailTitle>{t("viewTask.title")}</DetailTitle>
            <DetailInfo>{detailTask.title}</DetailInfo>

            {
                detailTask.description.title !== "" &&
                <>
                    <DetailTitle>{t("viewTask.description")}</DetailTitle>
                    <DetailInfo>{detailTask.description.title}</DetailInfo>
                </>
            }

            {
                detailTask.description.subtasks.length > 0 &&
                <SubtasksContainer>
                    <DetailTitle>{t("viewTask.subtasks")}</DetailTitle>
                    {
                        detailTask.description.subtasks.map((subtask, index) => (
                            <DetailInfo done={subtask.status} key={`detail${index}`}>
                                <SubIcon>
                                    <BiSubdirectoryRight/>
                                </SubIcon>

                                <span>{subtask.title}</span>
                                <IconBorder checked={subtask.status} onClick={() => subtaskClicked(detailTask, index)}>
                                    <BiCheck/>
                                </IconBorder>
                            </DetailInfo>
                        ))
                    }
                </SubtasksContainer>
            }

            <AddCancelContainer>
                <button className="back" onClick={(e) => {
                    deleteTask(e);
                    dispatch(setEmpty());
                    RedirectTo(history, pathBack.home);
                }}>
                    <AiOutlineDelete/>
                </button>
                <button className="back" onClick={() => setDetailTask(false)}>
                    <VscChromeClose/>
                </button>

                <button className="ok" onClick={() => RedirectTo(history, `${pathBack.home}${pathBack.edit}`)}>
                    <MdModeEdit/>
                </button>
            </AddCancelContainer>

        </PopUpContainer>
    )
};

export default PopUpDetails;
