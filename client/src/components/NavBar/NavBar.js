import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import {HiOutlineMenuAlt1} from "react-icons/hi";
import {RedirectTo} from "../App/Functions/redirect";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import Languages from "./Languages";
import useOnClickOutside from "../App/Functions/useOnClickOutside";
import {BsToggleOff, BsToggleOn} from 'react-icons/bs';
import {MdExitToApp} from 'react-icons/md';
import {ResetUser} from "../../actions/user/setUser";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

//icons
import {MdAccountCircle} from 'react-icons/md'

const StyledNavBar = styled.div`
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  background: ${({theme}) => theme.mainColors.backgroundColor};
  color: ${({theme}) => theme.mainColors.mainFontColor};
  padding: 20px 20px 20px 20px;
  z-index: 1;
  
  svg{
    font-size: ${({theme}) => theme.style.iconSizes.l};
    cursor: pointer;
  }
  img{
    height: 30px;
  }
  
  @media all and (min-width: 767px) and (max-width: 1000px){
    width: 70%;
    left: calc(15% - 20px);
  }
  @media all and (min-width: 1000px){
    width: 700px;
    left: calc((100% - 740px)/2)
  }
`;

const AccModalContainer = styled.div`
    position: relative;
    
     .accSettings{
          min-width: calc(100% + 120px);
          margin-top: 5px;
          background: ${({theme}) => theme.navBarColors.background};
          padding: 10px;
          position: absolute; 
          right: 0;
          visibility: ${(props) => props.v ? "visible" : "hidden"};
          box-shadow: ${({theme}) => theme.style.boxShadow};
          
          h4, svg{
            color: ${({theme}) => theme.navBarColors.color};
          }
          a {
            text-decoration: none;
          }
     }
`;

const CirclePhoto = styled.div`
  width: 50px;
  height: 50px;
  background: url("${(props) => props.source}");
  background-size: cover;
  border-radius: 25px;
  cursor: pointer;
  
  svg{
    font-size: 50px;
  }
`;

const ToggleMode = styled.div`
  display: flex;
  align-items: center;
  color: black;
  justify-content: space-between;
  
  svg{
    font-size: ${({theme}) => theme.style.iconSizes.l};
  }
`;

const NavBar = () => {

    let history = useHistory();
    const {t} = useTranslation('appData');

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("dark_mode") === "true" || false);

    const accModalSetting = useRef();
    const [accMI, setAccMI] = useState(false);
    useOnClickOutside(accModalSetting, () => setAccMI(false));

    return (
        <StyledNavBar>
            <HiOutlineMenuAlt1
                onClick={() => RedirectTo(history, '/')}
            />


            <AccModalContainer v={accMI} ref={accModalSetting}>
                {/*<CirclePhoto source={userImg} onClick={async () => {*/}
                {/*    await setAccMI(!accMI)*/}
                {/*}}/>*/}

                <CirclePhoto>
                    <MdAccountCircle onClick={() => {
                        setAccMI(!accMI)
                    }}/>
                </CirclePhoto>

                <div className="accSettings">
                    <ToggleMode>
                        <h4>{t("languageblock.darkmode")}</h4>
                        {
                            darkMode ?
                                <BsToggleOn
                                    onClick={() => {
                                        dispatch({type: "SET_DARK_MODE", payload: false});
                                        setDarkMode(false);
                                    }}
                                /> :
                                <BsToggleOff
                                    onClick={() => {
                                        dispatch({type: "SET_DARK_MODE", payload: true});
                                        setDarkMode(true);
                                    }}
                                />
                        }
                    </ToggleMode>
                    <Languages/>

                    {
                        user !== null ?
                            <ToggleMode>
                                <h4>{t("languageblock.logout")}</h4>
                                <MdExitToApp
                                    onClick={() => {
                                        dispatch(ResetUser());
                                        setAccMI(false);
                                        RedirectTo(history, '/');
                                    }}
                                />
                            </ToggleMode> :
                            <NavLink to="/">
                                <ToggleMode>
                                    <h4>{t("languageblock.login")}</h4>
                                    <MdExitToApp/>
                                </ToggleMode>
                            </NavLink>
                    }


                </div>
            </AccModalContainer>

        </StyledNavBar>
    )
};

export default NavBar;
