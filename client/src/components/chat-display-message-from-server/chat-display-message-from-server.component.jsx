import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


import './chat-display-message-from-server.styles.css'
const md5 = require('md5');

const ChatDisplayMessageFromServer = ({ username, useremail, data }) => {
   
    const [val, setVal] = useState([])

    useEffect(() => {
        setVal([...val, [<p id='chatLog' key={2} >
            {useremail == null ? '' :
                <img src={`https://gravatar.com/avatar/${md5(useremail)}?s=128`} alt='avatar picture' className='img-fluid img_avatar' />
            }&nbsp;
            {username == null ? '' : username +': '} &nbsp;
            {data == null ? '' : data}
        </p>]
        ])

        let chatElem = document.getElementById('chatLog')
        let scrollElem = document.getElementById('chats')
        if (scrollElem == null) {
            console.log('DIV chats IS NULL E###')
        } else {  
            if (chatElem == null) {
                console.log('NULL****')
            } else {
                scrollElem.scrollTop = scrollElem.scrollHeight + chatElem.scrollHeight*2
            }
        }
    }, [username, data, useremail])
    useEffect(() => { },[])
   
    return (
        <div className='chat_log' id='chats' >
            {
                val
            }
        </div>
    )
}
export default ChatDisplayMessageFromServer;