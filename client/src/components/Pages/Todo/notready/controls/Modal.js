import React, {useRef} from 'react';
import styled from 'styled-components';
import useOnClickOutside from "../../../../App/Functions/useOnClickOutside";
import modalWindow from "../../../../../styles/App/Shared/css/modalWindow";

const Background = styled.div`
   ${modalWindow};
  
   background-color: ${({theme})=>theme.mainColors.transparentBackgroundColor};
`;

const WindowInfo = styled.div`
  width: calc(100% - 40px);
  background-color: white;
  box-shadow: ${({theme})=> theme.style.boxShadow};
`;

const Modal = ({showModal, setShowModal, children}) => {

    const modalRef = useRef();

    useOnClickOutside(modalRef, () => setShowModal(false));

    return (
        <>
            {
                showModal &&
                <Background>
                    <WindowInfo ref={modalRef}>
                        {children}
                    </WindowInfo>
                </Background>
            }

        </>
    )
};

export default Modal;
