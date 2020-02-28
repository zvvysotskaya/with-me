import React, { useState } from 'react'
import io from 'socket.io-client'

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
        let socket = io()
        socket.on('chatMessageFromServer', function (data) {
         //   alert("Response from server!!! " + data.message + ' ' + data.username + ' ' + data.useremail)//message came from backend
            setSt(<ChatPage rem={rem} data={data.message} username={data.username} useremail={data.useremail} />)
        })
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