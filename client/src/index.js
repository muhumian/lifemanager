import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from "redux";
import {Provider} from 'react-redux';
import rootReducer from "./reducers/rootReducer";
import './translator/i18n';
import Theme from "./components/App/Theme/AppTheme";
import PreLoader from "./components/App/Preloaders/PreLoader";

const store = createStore(rootReducer);

ReactDOM.render(
    <Suspense fallback={<PreLoader/>}>
        <Provider store={store}>
            <Theme>
                {/*<PreLoader/>*/}
                <App/>
            </Theme>
        </Provider>
    </Suspense>,
    document.getElementById('root')
);
