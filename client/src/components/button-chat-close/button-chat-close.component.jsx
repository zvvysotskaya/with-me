import React, { useState } from 'react'

import {ReactComponent as CloseIcon}from '../../img/cancel-circle-chat.svg'
import ChatPage from '../../pages/chat-page/chat-page.page'

const ButtonChatClose = ({ rem,...props }) => {
    const[state, setState]=useState('')
    function cl(e) {
        e.preventDefault()
     //   alert('blbl '  + ' nnn ' + rem)
        rem()
      //  setState('')
    }
    return (
        <div>
            <CloseIcon onClick={cl} {...props}/>
        </div>
    )
}
export default ButtonChatClose
