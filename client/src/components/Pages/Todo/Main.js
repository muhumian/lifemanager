import React from 'react';
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

//icons
import {RiAddFill} from 'react-icons/ri'

//styles
import {AddCancelContainer} from "../../../styles/App/Elements/Form";
import {Title} from "../../../styles/App/Elements/Form";

//functions
import {RedirectTo} from "../../App/Functions/redirect";

//components
import ListOfTasks from "./ListOfTasks";
import Switch from "../../App/Switch/Switch";
import {useSelector} from "react-redux";

export default function Main() {

    const {t} = useTranslation('todo/main');
    const user = useSelector(state => state.user);
    let history = useHistory();

    return (
        <>
            <Title>{t("title")}, {user.name} 👋</Title>
            {/*<Switch/>*/}
            <ListOfTasks/>
            <AddCancelContainer>
                <button className="ok" onClick={() => RedirectTo(history, '/todo/tasks/new')}>
                    <RiAddFill/>
                </button>
            </AddCancelContainer>
        </>
    )
}
