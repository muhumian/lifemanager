import React from 'react';
import {useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components'
import DarkTheme from '../../../styles/Theme/darkTheme';
import LightTheme from '../../../styles/Theme/lightTheme';
import GlobalStyle from "../../../styles/Theme/globalStyles";

const Theme = ({children}) => {

    const darkMode = useSelector(state => state.darkMode.mode);

    return (
        <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
            <GlobalStyle/>
            {children}
        </ThemeProvider>
    );
};

export default Theme;
