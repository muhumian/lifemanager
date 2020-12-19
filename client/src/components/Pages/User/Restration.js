import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import {setEmpty} from "../../../actions/todo/tasks/setTask";
import {NavLink} from "react-router-dom";
import validator from 'validator';


//icons
import {VscClose} from "react-icons/vsc";
import {BiErrorCircle} from "react-icons/bi";

//styles
import {AddCancelContainer, Prompt, Input, Title, Form, Error} from "../../../styles/App/Elements/Form";
import {GlobalError} from "../../../styles/App/Elements/GlobalError";

//functions
import {RedirectTo} from "../../App/Functions/redirect";
import {AddUserDB} from "../../../actions/user/user";
import {setAlert} from "../../../actions/Alert/alerts";
import {useDispatch, useSelector} from "react-redux";
import {resetAppError, setAppError} from "../../../actions/App/errorActions";
import {setUser} from "../../../actions/user/setUser";

//components

const Registration = () => {

    let history = useHistory();
    const {t} = useTranslation('appData');
    const dispatch = useDispatch();
    const app_err = useSelector(state => state.app);

    // const [regData, setRegData] = useState({name: '', email: '', password: '', passwordConfirm: ''});
    const [regData, setRegData] = useState({
        name: 'Artur',
        email: 'artur.muhumian@gmail.com',
        password: '123123',
        passwordConfirm: '123123'
    });
    const [error, setError] = useState({name: false, email: false, password: false, passwordConfirm: false});

    const checkUserData = (userData) => {

        setError({name: false, email: false, password: false, passwordConfirm: false});

        if (!validator.isAlpha(userData.name)) {
            setError({name: "Name cannot contain numbers"});
            return false;
        } else if (!validator.isLength(userData.name, {min: 3, max: 20})) {
            setError({name: "Name can't be shorter than 3 characters and longer than 20 characters"});
            return false
        } else if (!validator.isEmail(userData.email)) {
            setError({email: "Email is wrong"});
            return false;
        } else if (userData.password.length < 6 || userData.password.length > 20){
            setError({password: "Password can't be shorter than 6 characters and longer than 20 characters"});
            return false;
        } else if (userData.password !== userData.passwordConfirm) {
            setError({passwordConfirm: "Passwords don't match"});
            return false;
        }

        return true;
    };

    const createNewUser = async (e) => {
        e.preventDefault();
        dispatch(resetAppError())

        if (checkUserData(regData)) {

            const response = await AddUserDB(regData);

            if (response.data.result) {
                dispatch(setUser(response.data.user));
                dispatch(setAlert({messageKey: 'success', status: true}));
                RedirectTo(history, '/todo');
            } else {
                dispatch(setAlert({messageKey: 'error', status: true}));
                dispatch(setAppError(response.data.errorMessage));
            }
        }
    };

    useEffect(() => {
        return () => dispatch(resetAppError());
    }, []);

    return (
        <>
            <Title>{t("registration.title")}</Title>
            <Form>
                <Input type="text" value={regData['name']}
                       onChange={(e) => setRegData({...regData, name: e.target.value})}
                       placeholder={t("registration.firstname")}/>
                {
                    error.name && <Error>{error.name}</Error>
                }
                <Input type="text" value={regData['email']}
                       onChange={(e) => setRegData({...regData, email: e.target.value})}
                       placeholder={t("registration.email_placeholder")}/>
                {
                    error.email && <Error>{error.email}</Error>
                }
                <Input type="password" value={regData['password']}
                       onChange={(e) => setRegData({...regData, password: e.target.value})}
                       placeholder={t("registration.password")}/>
                {
                    error.password && <Error>{error.password}</Error>
                }
                <Input type="password" value={regData['passwordConfirm']}
                       onChange={(e) => setRegData({...regData, passwordConfirm: e.target.value})}
                       placeholder={t("registration.passwordrepeat")}/>
                {
                    error.passwordConfirm && <Error>{error.passwordConfirm}</Error>
                }
                <Prompt>{t("registration.prompt")} <NavLink to="/">{t("login.title")}</NavLink></Prompt>

                {
                    app_err.status && <GlobalError><BiErrorCircle/><span>{app_err.errorMessage}</span></GlobalError>
                }

                <AddCancelContainer>
                    {/*<button className="back" type="submit" onClick={(e) => {*/}
                    {/*    e.preventDefault();*/}
                    {/*    // dispatch(setEmpty());*/}
                    {/*    RedirectTo(history, '/todo');*/}
                    {/*}}>*/}
                    {/*    <VscClose/>*/}
                    {/*</button>*/}

                    <button
                        type="submit"
                        className="ok expand"
                        onClick={(e) => createNewUser(e)}
                    >{t("registration.btns.join")}</button>
                </AddCancelContainer>
            </Form>
        </>
    )
};

export default Registration;
