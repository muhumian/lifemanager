import styled from 'styled-components';
import classicField from "../Shared/css/classicField";

export const Input = styled.input`
  ${classicField};
`;

export const Title = styled.h1`
  font-size: ${({theme}) => theme.style.fontSizes.xl};
  font-weight: 600;
`;

export const Prompt = styled.div`
  font-size: ${({theme}) => theme.style.fontSizes.xs};
  padding: 15px;
  
  a{
    text-decoration: none;
    font-weight: 700;
    color: #2d2d2d;
  }
`;

export const Error = styled.div`
  font-size: ${({theme}) => theme.style.fontSizes.xs};
  color: #d22121;
  padding: 10px 0 0 15px;
`;

export const Form = styled.form`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const AddCancelContainer = styled.div`
  width: calc(100% - 40px);
  display: flex;
  bottom: 0;
  position: fixed;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: center;
  
  button{
        min-width: 50px;
        height: 50px;
        border-radius: 25px;
        border: none;
        outline: none;
        box-shadow: ${({theme}) => theme.style.boxShadow};
        font-size: ${({theme}) => theme.style.fontSizes.s};
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: white;
        margin-left: 20px;
        
        &:first-child{
          margin-left: 0;
        }

        &.ok{
           background: ${({theme}) => theme.buttonsColor.backgroundOkColor};
           color: ${({theme}) =>  theme.buttonsColor.OkColor};
        };
        
        &.back{
          background: ${({theme}) => theme.buttonsColor.backgroundBackColor};
          color: ${({theme}) =>  theme.buttonsColor.BackColor};
        }
        
        &.expand{
          padding-right: 20px;
          padding-left: 20px;
        }
    }
    
  @media all and (min-width: 767px) and (max-width: 1000px){
    width: 70%;
  }
  @media all and (min-width: 1000px){
    width: 700px;
  }
`;

export const AddCancelContainerPopUp = styled(AddCancelContainer)`
    @media all and (min-width: 767px){
      left: 15%;
    }
    @media all and (min-width: 1000px){
      width: 700px;
      left: calc((100% - 700px) / 2);
    }
`;
