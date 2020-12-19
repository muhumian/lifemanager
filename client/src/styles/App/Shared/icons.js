import styled from "styled-components";

export const IconBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: ${(props) => props.checked ? "1px solid gray" : "1px solid #F9D417"};
  background: ${(props) => props.checked ? "white" : "#F9D417"};
  padding: 5px;
  border-radius: 20px;
  cursor: pointer;
  
  svg{
    color: white;
    font-size: ${({theme}) => theme.style.iconSizes.s};
  }
`;

export const IconDelete = styled.div`
  display: flex;
  svg{
    font-size: ${({theme}) => theme.style.iconSizes.m};
    cursor: pointer;
    padding: 5px;
  }
`;
