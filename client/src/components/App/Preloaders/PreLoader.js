import React from 'react';
import styled from 'styled-components';
import dark from '../../../styles/Theme/darkTheme';
import light from '../../../styles/Theme/lightTheme';

const PreLoaderWraper = styled.div`
    width: calc(100% - 40px);
    min-height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: space-between;
    background: ${() => localStorage.getItem('dark_mode') === "true" ? dark.mainColors.backgroundColor : light.mainColors.backgroundColor};
 `;

const AnimatedElement = styled.div`
    background: ${() => localStorage.getItem('dark_mode') === "true" ? dark.mainColors.backgroundAnimationGradient : light.mainColors.backgroundAnimationGradient};
    background-size: 400% 400%;
    animation: gradient 2s ease infinite;
    
    @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
}
`;

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  
  svg{
    color: darkgray;
    font-size: 30px;
  }
`;

const Menu = styled(AnimatedElement)`
  width: 30px;
  height: 30px;
`

const AnimatedCircle = styled(AnimatedElement)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const Title = styled(AnimatedElement)`
  width: 60%;
  height: 40px;
`;

const Line = styled(AnimatedElement)`
  width: 100%;
  height: 45px;
  margin-top: 20px;
  //border-radius: 10px;
  
  &:first-child{
  //margin-top: 0;
  }
`

const NewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const PreLoader = () => {
    return (
        <PreLoaderWraper>
            <div>
                <NavContainer>
                    <Menu/>
                    <AnimatedCircle/>
                </NavContainer>
                <Title/>
                <div>
                    <Line/>
                    <Line/>
                    <Line/>
                </div>
            </div>

            <NewContainer>
                <AnimatedCircle/>
            </NewContainer>
        </PreLoaderWraper>
    );
};

export default PreLoader;
