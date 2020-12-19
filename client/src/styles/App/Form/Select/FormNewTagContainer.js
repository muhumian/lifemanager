import styled from 'styled-components';

export const FormNewTagContainer = styled.div`
  width: 100%;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  input{
    width: 100%;
    //padding-left: 2px;
    //padding: 10px 15px 10px 15px;
    font-size: ${({theme}) => theme.style.fontSizes.xs};
    outline: none;
    //border-radius: 20px;
    border: none;
    //border: 1px solid #dbdbdb;
  }
  
  button{
    width: 40px;
    border: none;
    padding: 10px;
    border-radius: 20px;
    background: ${({theme}) => theme.buttonsColor.selectBtn};
    color: white;    
    outline: none;
    margin-left: 10px;
    cursor: pointer;
    
    &:active{
      transition: 0.5s ease-in ;
      background: orange;
    }
  }
`;

export default FormNewTagContainer;
