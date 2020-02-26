import React from 'react'

import './chat-page.styles.css'
import ButtonChatClose from '../../components/button-chat-close/button-chat-close.component'

const ChatPage = ({ rem}) => {
  
    return (
        <div className='chat_page'>
            <div className="chat_card_head">
                <div className='d-flex px-3 justify-content-between'>
                    <p>Chat</p>
                    <ButtonChatClose rem={rem} />
                </div>
                
            </div>
            <div className='chat_card_body'>
                <p>Hello</p>
            </div>
            <div className='chat_card_footer'>
            </div>
        </div>
    )
}
export default ChatPage