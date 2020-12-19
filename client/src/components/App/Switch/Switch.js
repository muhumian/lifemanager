import React from 'react';
import styled from 'styled-components';
import {useHistory} from "react-router";
import {RedirectTo} from "../Functions/redirect";
import {useTranslation} from "react-i18next";

const StyledSwitch = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
`;

const StyledSwitchItem = styled.div`
  padding: 10px;
  border-radius: 10px;
  box-shadow: ${({theme}) => theme.style.boxShadow};
  margin-left: 10px;
  cursor: pointer;
  
  &:first-child{
    margin-left: 0;
  }
  
  ${(props) => props.active ? `
      color: white;
      background: #F9D417;
      font-weight: 600;
  ` : `
      color: black;
      background: white;
      font-weight: 500;
  `};
`;

const Switch = () => {

    const history = useHistory();
    const {t} = useTranslation('appData');

    function isActive(path) {
        return history.location.pathname.search(path) >= 0;
    }

    return (
        <StyledSwitch>
            <StyledSwitchItem active={isActive('/todo')} onClick={() => RedirectTo(history, '/todo')}>
                {t("switch.todo")}
            </StyledSwitchItem>
            <StyledSwitchItem active={isActive('/budget')} onClick={() => RedirectTo(history, '/budget')}>
                {t("switch.budget")}
            </StyledSwitchItem>
        </StyledSwitch>
    )
};

export default Switch;
