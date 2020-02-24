import React from 'react'
import { withRouter } from 'react-router-dom'

import './chat.styles.css'
import { ReactComponent as ChatIcon } from '../../img/chat.svg'

const Chat = ({ history }) => {

    function click(e) {
        e.preventDefault()
      //  alert('chat!!!!!')
        history.push('/chat-page')
    }

    return (
        <div className='chat_icon'>
            <ChatIcon onClick={click}/>
        </div>
        )
}
export default withRouter(Chat)