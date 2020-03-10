import React, { useState } from 'react'
import io from 'socket.io-client'

import './chat.styles.css'
import { ReactComponent as ChatIcon } from '../../img/chat.svg'
import ChatPage from '../../pages/chat-page/chat-page.page'

const Chat = () => {
    let socket = io()
    const [st, setSt] = useState('')

    function click(e) {
        e.preventDefault()
        return showChat()
    }

    function rem() {
        setSt('')
      //  socket.close();
      
    } 
    
    function showChat() {
        setSt(<ChatPage rem={rem} />)
        socket.on('chatMessageFromServer', function (data) {
            setSt(<ChatPage rem={rem} data={[...data.message]} username={data.username} useremail={data.useremail} />)           
        })
     //   socket.on('disconnect', function () { console.log('CLient disconnected!!!') });
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