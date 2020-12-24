import React from 'react';
import styled from 'styled-components';

const StyledSidebar = styled.div`
  width: 30%;
  //margin-right: 15px;
  background: white;
  position: fixed;
  min-height: 100vh;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  
  @media all and (max-width: 767px){
    display: none;
  }
`;
const SidebarElementsBlock = styled.div`
  width: 40%;
  height: 100vh;
  background: orange;
`;

export const Sidebar = () => {
    return(
        <StyledSidebar>
            <SidebarElementsBlock>
                FGHJK
            </SidebarElementsBlock>
        </StyledSidebar>
    )
};
