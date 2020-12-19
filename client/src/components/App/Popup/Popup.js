import React from 'react';
import {DetailsView, PopUpView} from "../../../styles/App/Shared/popup";

const PopUpContainer = ({children}) => {
    return(
        <PopUpView>
            <DetailsView>
                {children}
            </DetailsView>
        </PopUpView>
    )
};

export default PopUpContainer;
