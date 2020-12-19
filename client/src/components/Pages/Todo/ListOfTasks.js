import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';

//actions
import {UpdateTaskDB, UpdateTaskStatusDB} from "../../../actions/todo/DB/CRUD_Task";
import {getTask, getTasks, setTasks} from "../../../actions/todo/tasks/getTasks";

//icons
import {BiCheck} from 'react-icons/bi'
import {BiSubdirectoryRight, BiErrorCircle} from "react-icons/bi";
import {IoIosDoneAll} from "react-icons/io";

//styles
import {IconBorder} from '../../../styles/App/Shared/icons'
import InputTextareaSharedStyle from "../../../styles/App/Shared/css/classicField"

//components
import PopUpDetails from "./PopUpDetails";
import {setTask} from "../../../actions/todo/tasks/setTask";
import {setAlert, setAlertNew} from "../../../actions/Alert/alerts";
import {Error} from "../../../styles/App/Elements/Form";
import {GlobalError} from "../../../styles/App/Elements/GlobalError";
import {resetAppError, setAppError} from "../../../actions/App/errorActions";
import {StartTasksSetter, TasksChecker} from "./functions/taskSetter";

const TaskItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const InfoDetailsContainer = styled.div`
  width: calc(100% - 10px);
  padding-right: 10px;
`;

const TaskItem = styled.div`
  ${InputTextareaSharedStyle};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: ${({active}) => !active && "0.5"};
  text-decoration: ${({active}) => !active && "line-through"};
  cursor: pointer;

  &:first-child{
    margin-top: 0;
  }
`;

const TaskInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  span{
    width: 100%;
  }
`;

const TaskDetailsInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 5px;
  //align-items: center;
  
`;

const DetailElement = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({theme}) => theme.style.fontSizes.xs};
  padding-right: 10px;
  color: gray;
  
  &:last-child{
    padding-right: 0;
  }
`;

const ListOfTasks = () => {

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks).sort((a, b) => b.status - a.status);
    const [detailTask, setDetailTask] = useState(false);
    const app_err = useSelector(state => state.app);

    const updateStatus = async (id, status) => {
        await TasksChecker(await UpdateTaskStatusDB(id, status), dispatch);
    };

    const countDoneSubtasks = (subtasks) => {
        let counter = 0;
        subtasks.forEach(el => {
            if (el.status === false) counter++;
        });
        return counter;
    };

    useEffect(() => {

        const setupTasks = async () => {
            await StartTasksSetter(dispatch);
        };
        setupTasks();

        return () => dispatch(resetAppError());

    }, []);

    return (
        <TaskItemsContainer>

            {
                app_err.status && <GlobalError><BiErrorCircle/><span>{app_err.errorMessage}</span></GlobalError>
            }

            {
                tasks.length === 0 && !app_err.status &&
                    <div>
                        No tasks
                    </div>
            }

            {
                tasks.map((task, index) => (
                    <TaskItem primary active={task.status} key={`taskitem${index}`}>
                        <InfoDetailsContainer onClick={() => setDetailTask(task)}>
                            <TaskInfo>
                                <span>{task.title}</span>
                            </TaskInfo>

                            {
                                task.description.subtasks.length > 0 &&
                                <TaskDetailsInfo>
                                    <DetailElement>
                                        <BiSubdirectoryRight/>
                                        <span>{task.description.subtasks.length}</span>
                                    </DetailElement>
                                    <DetailElement>
                                        <IoIosDoneAll/>
                                        <span>{countDoneSubtasks(task.description.subtasks)}</span>
                                    </DetailElement>
                                </TaskDetailsInfo>
                            }

                        </InfoDetailsContainer>
                        <IconBorder checked={task.status} onClick={() => updateStatus(task._id, task.status)}>
                            <BiCheck/>
                        </IconBorder>
                    </TaskItem>
                ))
            }

            {
                !!detailTask && <PopUpDetails detailTask={detailTask} setDetailTask={setDetailTask}
                                              pathBack={{home: "/todo", edit: `/task/edit/${detailTask._id}`}}/>
            }

        </TaskItemsContainer>
    )
};

export default ListOfTasks;
