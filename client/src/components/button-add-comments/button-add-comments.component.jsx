import React from 'react';
import { Link } from 'react-router-dom';
import ButtonCustom from '../button-custom/button-custom.component'

const ButtonAddComments = ({ post, btnClick }) => {
    console.log('BUTTON: ' + JSON.stringify(post))
    function handleClick(e) {
            e.preventDefault()
            btnClick()
        }
    return (<div>
       
            <ButtonCustom onClick={handleClick}>Add Comments</ButtonCustom>
       
    </div>
    )
}
export default ButtonAddComments