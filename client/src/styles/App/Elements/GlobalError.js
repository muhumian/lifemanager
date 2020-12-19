import styled from 'styled-components';

export const GlobalError = styled.div`
  width: calc(100% - 24px);
    border: 2px solid #d62a2a;
    color: #b92b2b;
    padding: 10px;
    font-weight: 600;
    border-radius: 10px;
    display: flex;
    align-items: center;
    
    svg{
      min-width: 30px;
      font-size: ${({theme}) => theme.style.fontSizes.m};
    }
    
    span{
      text-align: left;
      padding-left: 10px;
      font-size: ${({theme}) => theme.style.fontSizes.s};
    }
`;
