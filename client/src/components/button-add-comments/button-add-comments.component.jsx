import React from 'react';

import ButtonCustom from '../button-custom/button-custom.component';

const ButtonAddComments = ({ btnClick }) => {
    
    function handleClick(e) {
            e.preventDefault()
            btnClick()
        }
    return (
        <div>
            <ButtonCustom onClick={handleClick}>Add Comments</ButtonCustom>
        </div>
    )
}
export default ButtonAddComments;