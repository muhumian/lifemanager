import React from 'react';
import styled from 'styled-components';

const StyleDropDownBtn = styled.img`
  height: ${({theme})=> theme.style.iconSizes.s};
  transform: rotate(${({rt}) => rt ? "180deg" : "0deg"});
`;

const DropDownBtn = ({source, rotate}) => {
    return <StyleDropDownBtn rt={rotate} src={source}/>
};

export default DropDownBtn;
