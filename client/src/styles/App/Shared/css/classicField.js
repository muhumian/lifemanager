import {css} from 'styled-components'

export default css`
  width: calc(100% - 30px);
  background: white;
  border: none;
  outline: none;
  font-size: ${({theme}) => theme.style.fontSizes.s};
  padding: 15px;
  border-radius: 10px;
  box-shadow: ${({theme}) => theme.style.boxShadow};
  margin-top: 15px;
  color: #191925;
  
  &:first-child {
        margin-top: 0;
    }}
`;
