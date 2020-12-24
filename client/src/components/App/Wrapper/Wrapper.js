import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useHistory} from "react-router";
import {RedirectTo} from "../Functions/redirect";
import {Sidebar} from "../../Sidebar/Sidebar";

const StyledWrapper = styled.div`
    width: calc(100% - 40px);
    min-height: calc(100vh - 165px);
    display: flex;
    flex-direction: column;
    padding: 90px 20px 75px 20px;
    color: ${({theme}) => theme.mainColors.mainFontColor};
    // background: ${({theme}) => theme.mainColors.backgroundColor};
    
    @media all and (min-width: 767px){
       width: 70%;
       max-width: 700px;
       margin: 0 auto;
    }
    @media all and (min-width: 1000px){
       width: 70%;
       left: calc(350px - 20px);
    }
`;

const Wrapper = ({children}) => {

    const history = useHistory();
    const moveRef = useRef();
    let xDown, yDown;

    const pages = ['/todo', '/budget'];

    const navigator = (to) => {

        if (to === 'left' && pages.length > pages.indexOf(history.location.pathname) + 1) {
            RedirectTo(history, pages[pages.indexOf(history.location.pathname) + 1])
        } else if (to === 'left') {
            RedirectTo(history, pages[0])
        }


        if (to === 'right' && pages.indexOf(history.location.pathname) - 1 >= 0) {
            RedirectTo(history, pages[pages.indexOf(history.location.pathname) - 1])
        } else if (to === 'right') {
            RedirectTo(history, pages[pages.length - 1])
        }
    };

    const handleTouchStart = (evt) => {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    };

    const handleTouchMove = (evt) => {
        if (!xDown || !yDown) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if (Math.abs(xDiff) + Math.abs(yDiff) > 100) {
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {/* left swipe */
                    navigator('left');
                } else {/* right swipe */
                    navigator('right');
                }
            }
            // else {
            //     if ( yDiff > 0 ) {/* up swipe */
            //         alert('Up!');
            //     } else { /* down swipe */
            //         alert('Down!');s
            //     }
            // }

            /* reset values */
            xDown = null;
            yDown = null;
        }
    };

    useEffect(() => {
        // if (history.location.pathname === '/') RedirectTo(history, pages[0]);

        // moveRef.current.addEventListener("touchstart", handleTouchStart, false);
        // moveRef.current.addEventListener("touchmove", handleTouchMove, false);
    }, []);

    return (
        <StyledWrapper ref={moveRef}>
            {/*<Sidebar/>*/}
            {children}
        </StyledWrapper>
    )
};

export default Wrapper;


