import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import {setDescription, updateSubTask, updateSubtaskStatus} from "../../../actions/todo/tasks/setTask"
import {useTranslation} from "react-i18next";

//actions
import {addSubTask, deleteSubTask} from "../../../actions/todo/tasks/setTask"

//styles
import {SubtasksContainer, DetailTitle, DetailInfo, SubIcon} from "../../../styles/App/Shared/subtasks";
import {IconBorder, IconDelete} from "../../../styles/App/Shared/icons";
import InputTextareaSharedStyle from "../../../styles/App/Shared/css/classicField";
import FormNewTagContainer from "../../../styles/App/Form/Select/FormNewTagContainer";

//icons
import {BiCheck} from "react-icons/bi";
import {AiOutlineDelete} from "react-icons/ai";
import {BiSubdirectoryRight} from 'react-icons/bi'

const StyledTextarea = styled.div`
  ${InputTextareaSharedStyle};
  textarea{
      width: 100%;
      resize: none;
      border: none;
      outline: none;
      font-size: ${({theme}) => theme.style.fontSizes.s};
      margin-bottom: 10px;
  }
`;

const NewSubTaskFormContainer = styled(FormNewTagContainer)`
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
`;

const TextArea = ({task, dispatch}) => {

    const {t} = useTranslation('todo/task');
    const subTaskInput = useRef();
    const endOfSubTasksList = useRef();

    const subTasks = task.description.subtasks;
    const [newSubTask, setNewSubTask] = useState('');

    return (
        <StyledTextarea>
            <TextareaAutosize minRows={1} maxRows={5} placeholder={t("newTask.i_task_description")}
                              value={task.description.title}
                              onChange={(e) => {
                                  dispatch(setDescription(e.target.value))
                              }}/>

            {
                subTasks.length > 0 &&
                <SubtasksContainer>

                    <DetailTitle>{t("newTask.subtask")}</DetailTitle>

                    {
                        subTasks.map((subTask, index) => (
                            <DetailInfo done={subTask.status} key={`subitem${index}`}>
                                <SubIcon>
                                    <BiSubdirectoryRight/>
                                </SubIcon>
                                <input type="text" value={subTask.title} placeholder={t("newTask.subedittitle")} onChange={(e)=>{
                                    let sbtsk = subTasks[index];
                                    sbtsk.title = e.target.value;
                                    dispatch(updateSubTask(index, sbtsk));
                                }} />

                                <IconBorder checked={subTask.status} onClick={() => dispatch(updateSubtaskStatus(subTasks, index))}>
                                    <BiCheck/>
                                </IconBorder>

                                <IconDelete checked={true}>
                                    <AiOutlineDelete  onClick={() => dispatch(deleteSubTask(subTasks, index))}/>
                                </IconDelete>
                            </DetailInfo>
                        ))
                    }

                </SubtasksContainer>
            }


            <NewSubTaskFormContainer>
                <input ref={subTaskInput} type="text" value={newSubTask} onChange={(e) => setNewSubTask(e.target.value)}
                       placeholder={t("newTask.i_subtask")}/>
                <button onClick={async (e) => {
                    e.preventDefault();
                    if (newSubTask.trim().length > 0) {
                        await dispatch(addSubTask(task.description.subtasks, newSubTask));
                        setNewSubTask('');
                        subTaskInput.current.focus();
                        endOfSubTasksList.current.scrollIntoView();
                    }
                }}>+
                </button>
            </NewSubTaskFormContainer>
            <div ref={endOfSubTasksList}/>
        </StyledTextarea>
    )
};

export default TextArea;
