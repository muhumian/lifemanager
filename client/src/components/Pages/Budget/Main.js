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
import Switch from "../../App/Switch/Switch";

export default function MainBudget() {

    const {t} = useTranslation('budget/main');
    let history = useHistory();

    return (
        <>
            <Title>{t("title")} 💰</Title>
            <Switch/>
            <AddCancelContainer>
                <button className="ok" onClick={() => RedirectTo(history, '/budget')}>
                    <RiAddFill/>
                </button>
            </AddCancelContainer>

        </>
    )
};
