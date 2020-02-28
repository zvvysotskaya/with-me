import React from 'react'

import './chat-display-message-from-server.styles.css'
const md5 = require('md5');

const ChatDisplayMessageFromServer = ({ data, username, useremail }) => {
    
    return (
        <div>
            <p>{useremail ? (<img src={`https://gravatar.com/avatar/${md5(useremail)}?s=128`} alt='avatar picture' className='img-fluid img_avatar' />) : ''}&nbsp;&nbsp;
                {username ? `${username}: ` : ''}
                {data ? data : ''}
            </p>
        </div>)
}
export default ChatDisplayMessageFromServer;