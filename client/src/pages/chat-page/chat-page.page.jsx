import React from 'react'

import './chat-page.styles.css'
import ButtonChatClose from '../../components/button-chat-close/button-chat-close.component'
import ChatForm from '../../components/chat-form/chat-form.component'
import ChatDisplayMessageFromServer from '../../components/chat-display-message-from-server/chat-display-message-from-server.component'

const ChatPage = ({ rem, data, username, useremail }) => {

   
    return (
        <div className='chat_page'>
            <div className="chat_card_head">
                <div className='d-flex px-3 justify-content-between'>
                    <p>Chat</p>
                    <ButtonChatClose rem={rem} />
                </div>
            </div>
            <div className='chat_card_body'>
                <ChatDisplayMessageFromServer data={data} username={username} useremail={useremail} key={username} />
            </div>
            <div className='chat_card_footer'>
                <ChatForm />
            </div>
        </div>
    )
}
export default ChatPage