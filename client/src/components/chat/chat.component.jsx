import React, { useState } from 'react'

import './chat.styles.css'
import { ReactComponent as ChatIcon } from '../../img/chat.svg'
import ChatPage from '../../pages/chat-page/chat-page.page'

const Chat = () => {

    const [st, setSt] = useState('')

    function click(e) {
        e.preventDefault()
        return showChat()
    }

    function rem() {
        setSt('')
    }

    function showChat() {
        setSt(<ChatPage rem={rem} />)
    }
    return (
        <div>
            <div>{st}</div>
            <div className='chat_icon' id='aa'>
                <ChatIcon onClick={click} />
            </div>
        </div>
        )
}
export default Chat