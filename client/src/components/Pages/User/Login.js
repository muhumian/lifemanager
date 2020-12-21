import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GlobalError} from "../../../styles/App/Elements/GlobalError";
import validator from "validator";
import {RedirectTo} from "../../App/Functions/redirect";

//actions
import {UserAuthorization} from "../../../actions/user/user";
import {setAlert, setAlertNew} from "../../../actions/Alert/alerts";
import {resetAppError, setAppError} from "../../../actions/App/errorActions";
import {setUser} from "../../../actions/user/setUser";

//icons
import {BiErrorCircle} from "react-icons/bi";

//styles
import {AddCancelContainer, Input, Title, Prompt, Form, Error} from "../../../styles/App/Elements/Form";

//functions

//components

const Login = () => {

    let history = useHistory();
    const {t} = useTranslation('appData');
    const dispatch = useDispatch();
    const app_err = useSelector(state => state.app);
    const user = useSelector(state => state.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({email: false, password: false});

    const checkUserData = (userData) => {

        setError({email: false, password: false});

        if (!validator.isEmail(userData.email)) {
            setError({email: "Invalid email"});
            return false;
        } else if (userData.password.length < 6 || userData.password.length > 20) {
            setError({password: "Password can't be shorter than 6 characters and longer than 20 characters"});
            return false;
        } else return true;
    };

    const auth = async (e) => {
        e.preventDefault();
        dispatch(resetAppError());

        if (checkUserData({email, password})) {
            const response = await UserAuthorization({email, password})
            if (response.data.result) {
                dispatch(setAlertNew('success', true));
                dispatch(setUser(response.data.content));
            } else {
                dispatch(setAppError(response.data.errorMessage));
            }
        }
    };

    useEffect(() => {
        // console.log(user);
        if (user !== null) RedirectTo(history, '/todo');
    }, [user]);

    useEffect(() => {
        return () => dispatch(resetAppError());
    },[]);

    return (
        <>
            <Title>{t("login.title")}</Title>

            <Form>
                <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                       placeholder={t("login.email_placeholder")}/>
                {
                    error.email && <Error>{error.email}</Error>
                }
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       placeholder={t("login.password")}/>
                {
                    error.password && <Error>{error.password}</Error>
                }
                <Prompt>{t("login.prompt")} <NavLink to="/registration">{t("registration.title")}</NavLink></Prompt>
                {
                    app_err.status && <GlobalError><BiErrorCircle/><span>{app_err.errorMessage}</span></GlobalError>
                }
                <AddCancelContainer>
                    {/*<button className="back" type="submit" onClick={(e) => {*/}
                    {/*    e.preventDefault();*/}
                    {/*    // dispatch(setEmpty());*/}
                    {/*    RedirectTo(history, '/');*/}
                    {/*}}>*/}
                    {/*    <VscClose/>*/}
                    {/*</button>*/}
                    <button
                        type="submit"
                        className="ok expand"
                        onClick={(e) => auth(e)}
                    >{t("login.btns.join")}</button>
                </AddCancelContainer>
            </Form>

        </>
    )
};

export default Login;
