import {createGlobalStyle} from 'styled-components';
import CircularStdFont from '../../assets/fonts/860c3ec7bbc5da3e97233ccecafe512e.ttf';


const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "CircularStdBook"; 
        src: url(${CircularStdFont});
    }
    
    * {
      padding: 0;
      margin: 0;
      font-family: CircularStdBook,-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      
      -webkit-tap-highlight-color: transparent;
      
      ::-webkit-scrollbar { width: 0; }
      -ms-overflow-style: none; 
      overflow: -moz-scrollbars-none; 
    }
`;

export default GlobalStyle;
