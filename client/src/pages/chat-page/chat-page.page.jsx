import React, { useEffect } from 'react'

import './chat-page.styles.css'
import ButtonChatClose from '../../components/button-chat-close/button-chat-close.component'

const ChatPage = ({ rem }) => {
    useEffect(() => {
        setTimeout(()=>document.getElementById('focuss').focus(), 1000)
    }, [])
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
                <div className=''>
                    
                </div>
            </div>
            <div className='chat_card_footer'>
                <form>
                    <div class="form-group">
                        <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Write Your Message..."
                            id="focuss"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ChatPage