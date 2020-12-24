import React, {useEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useSelector} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


//components
import CreateTask from './components/Pages/Todo/CreateTask';
import Wrapper from "./components/App/Wrapper/Wrapper";
import Main from "./components/Pages/Todo/Main";
import NavBar from "./components/NavBar/NavBar";
import Alert from "./components/App/Alert/Alert";
import EditTask from "./components/Pages/Todo/EditTask";
import MainBudget from "./components/Pages/Budget/Main";
import Registration from "./components/Pages/User/Restration";
import Login from "./components/Pages/User/Login";
import {GlobalError} from "./styles/App/Elements/GlobalError";

//buttons
// import {BiErrorCircle} from 'react-icons/bi';

// import UserPage from "./components/Pages/User/UserPage";

const App = () => {

    // const page = {
    //     transition: {
    //         duration: 0.9
    //     },
    //     variants: {
    //         in: {
    //             opacity: 1
    //         },
    //         out: {
    //             opacity: 0
    //         }
    //     }
    // };

    const user = useSelector(state => state.user);

    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

    return (
        <Router>
            <NavBar/>

            <Wrapper>
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>

                    {
                        user !== Object &&
                        <Route exact path="/registration">
                            <Registration/>
                        </Route>
                    }

                    {/*<Route exact path="/myaccount">*/}
                    {/*    <UserPage/>*/}
                    {/*</Route>*/}

                    {
                        user !== null &&
                        <>
                            <Route exact path="/todo">
                                <Main/>
                            </Route>

                            <Route exact path="/todo/tasks/new">
                                <CreateTask/>
                            </Route>

                            <Route exact path="/todo/task/edit/:id">
                                <EditTask/>
                            </Route>

                            {/*<Route exact path="/budget">*/}
                            {/*    <MainBudget/>*/}
                            {/*</Route>*/}
                        </>
                    }

                    <Route path="*">
                        <div>Not found</div>
                    </Route>

                </Switch>
            </Wrapper>
            <Alert/>
        </Router>
    );
};

export default App;
