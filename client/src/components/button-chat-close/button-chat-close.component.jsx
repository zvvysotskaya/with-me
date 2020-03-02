import React from 'react'


import { ReactComponent as CloseIcon } from '../../img/cancel-circle-chat.svg'



const ButtonChatClose = ({ rem,...props }) => {
    
    function cl(e) {
        e.preventDefault()     
        rem()
    }
    return (
        <div>
            <CloseIcon onClick={cl} {...props}/>
        </div>
    )
}
export default ButtonChatClose
