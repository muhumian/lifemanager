import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import {useTranslation} from "react-i18next";

//styles
import modalWindow from "../../../styles/App/Shared/css/modalWindow";

//actions
import {setAlert} from "../../../actions/Alert/alerts";

//icons
import {IoIosCheckmarkCircle} from "react-icons/io";

//functions
import {VscError} from "react-icons/vsc";


const StyledAlert = styled.div`
  ${modalWindow};
  
  transition: backdrop-filter 0.25s;
  z-index: 2;
  
  &.show{
    backdrop-filter: blur(30px) opacity(1);
    -webkit-backdrop-filter: blur(5px) opacity(1);
    opacity: 1;
  }
  
  &.hide{
      backdrop-filter: blur(30px) opacity(0);
      -webkit-backdrop-filter: blur(5px) opacity(0);
      opacity: 0;
  }  
`;

const StyledWindow = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  svg{
    background: ${(props)=>props.err?"#d24040": props.theme.alertColors.svgBackground};
    border-radius: 50px;
    color: ${({theme}) => theme.alertColors.svgColor};
    font-size: 100px;
    box-shadow:  ${({theme}) => theme.style.boxShadow}; 
  };
  
  span{
    padding-top: 10px;
    font-size: ${({theme}) => theme.style.fontSizes.s};
    color: ${(props)=>props.err?"#d24040": props.theme.alertColors.spanColor};
    text-align: center;
    font-weight: 500;
  }
  
`;

const Alert = () => {

    const dispatch = useDispatch();
    const {t} = useTranslation('appData');
    const [als, setAls] = useState(false);
    const act = useSelector(state => state.alert);

    useEffect(() => {
        if (act.status) {
            setAls(true);

            setTimeout(() => {
                setAls(false);
                setTimeout(() => {
                    setAls(false);
                    dispatch(setAlert({messageKey: null,status: false}));
                }, 200);
            }, 1000);
        }
    }, [act]);

    return (
        <>
            {
                act.status &&
                <>
                    <StyledAlert className={als ? "show" : "hide"}>
                        <StyledWindow err={act.messageKey === 'error'} >
                            {
                                act.messageKey === 'error'?
                                    <VscError/>:
                                    <IoIosCheckmarkCircle/>
                            }
                            <span>{t(`alert.${act.messageKey}`)}</span>
                        </StyledWindow>
                    </StyledAlert>
                </>
            }
        </>
    );
};

export default Alert;
