import styled from "styled-components";

export const PopUpView = styled.div`
  width: 100%;
  height: 100vh;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 2;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(1px) ;
  -webkit-backdrop-filter: blur(1px);
`;

export const DetailsView = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  max-height: 70vh;
  overflow: scroll;
  padding: 20px 20px 75px 20px;
  position: absolute;
  background: ${({theme}) => theme.navBarColors.background};
  bottom: 0;
  left: 0;
  font-size: ${({theme}) => theme.style.fontSizes.s};
  z-index: 2;
`;
