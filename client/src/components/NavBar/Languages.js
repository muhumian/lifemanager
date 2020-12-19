import React, {useState, useEffect, useRef} from 'react'
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import Flag from 'react-world-flags'
import useOnClickOutside from "../App/Functions/useOnClickOutside";

const LangContainer = styled.div`
  display: flex;
  align-items: center;
  color: black;
  justify-content: space-between;
  min-height: 30px;
  img{
    cursor: pointer;
    width: 30px;
    height: auto;
  }
`;

const FalgWrapper = styled.div`
  width: 30px;
  height: auto;
  position: relative;
  
  .auto{
    height: auto;
  }
`;

const LangsSelectContrainer = styled.div`
   //width: 50px;
   //height: 50px;
   background: ${({theme})=> theme.mainColors.backgroundColor};
   position: absolute;
   display: none;
`;

const languageOptions = [
    {value: 'us'},
    {value: 'ua'},
    {value: 'es'}
];

const Languages = () => {
    const {t, i18n} = useTranslation('appData');
    //переделать через диспатч
    const [language, setLanguage] = useState(useSelector(state => state.currentLanguage.code));
    const [selection, setSelection] = useState(false);
    const selectLangRef = useRef();

    const flagWrapperRefField = useRef();
    useOnClickOutside(flagWrapperRefField, () => setSelection(false));

    const changeLang = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
    };

    useEffect(() => {
        if (selection) selectLangRef.current.style.display = "block";
        else selectLangRef.current.style.display = "none"
    }, [selection]);

    return (
        <>
            <LangContainer>
                <h4>{t("languageblock.language")}</h4>
                {/*<div>*/}

                <FalgWrapper ref={flagWrapperRefField}  onClick={() => setSelection(!selection)}>
                    <Flag code={language} onClick={() => setSelection(!selection)} className="auto"/>
                    {/*<img src={US} alt=""/>*/}
                    <LangsSelectContrainer ref={selectLangRef}>
                        {
                            languageOptions.map((lang, index) => (
                                lang.value !== language &&
                                <Flag key={index} code={lang.value} onClick={() => changeLang(lang.value)} className="auto"/>
                            ))
                        }
                        {/*<img src={UA} alt=""/>*/}

                    </LangsSelectContrainer>
                </FalgWrapper>


                {/*</div>*/}
            </LangContainer>

            {/*<select onChange={(e) => changeLang(e)} defaultValue={language}>*/}
            {/*    {*/}
            {/*        languageOptions.map((lang, index) => (*/}
            {/*            <option key={index} value={lang.value}>{t(lang.value)}</option>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</select>*/}
        </>
    );
};

export default Languages
