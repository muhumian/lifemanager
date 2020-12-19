import styled from "styled-components";

export const SubtasksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DetailTitle = styled.div`
  width: 100%;
  margin-bottom: 5px;
  font-size: ${({theme}) => theme.style.fontSizes.s};
  font-weight: 600;
`;

export const DetailInfo = styled.div`
  width: 100%;
  font-size: ${({theme}) => theme.style.fontSizes.s};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  word-break: break-word;
  
  span{
    width: 100%;
    padding-right: 10px;
    text-decoration: ${(props) => props.done ? "none" : "line-through"};
  }
  
  &:last-child{
    margin-bottom: 0;
  }
`;

export const SubIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;
