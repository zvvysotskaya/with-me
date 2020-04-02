import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const ChatForm = () => {

    const socket = io(`http://localhost:5000/`)

    useEffect(() => {
        setTimeout(() => document.getElementById('focuss').focus(), 1000)
    }, [])

    const [val, setVal] = useState({
        chatMessage: ''
    })
    const [valUserName, setValUserName] = useState({
        userName: ''
    })
    const [valUserEmail, setValUserEmail] = useState({
        userEmail: ''
    })
    useEffect(() => {
        fetch('/aaa')
            .then((res) => res.text())
            .then(res => setValUserName({ userName: res }))
            .catch(er => console.log(er))
    }, [])

    useEffect(() => {
        fetch('/userem')
            .then((res) => res.text())
            .then(res => setValUserEmail({ userEmail: res }))
            .catch(er => console.log(er))
    }, [])

    const [csrfSt, setCsrfSt] = useState('')
    useEffect(() => {
        fetch('/getCSRF')
            .then(res => res.text())
            .then(res => setCsrfSt(res))
            .catch(err => console.log(err))
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        sendMessageToServer() 
    }

    function sendMessageToServer() {
        const data = {
            chatMessage: val.chatMessage,
            userName: valUserName.userName,
            userEmail: valUserEmail.userEmail,
            _csrf: csrfSt.toString()
        }
        socket.emit('chatMessageFromBrowser', data)
        setVal({
            chatMessage: ''
        })
       
        setTimeout(() => document.getElementById('focuss').focus(), 90)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Write Your Message..."
                        id="focuss"
                        value={val.chatMessage}
                        name='chatMessage'
                        onChange={e=> setVal({ ...val, chatMessage: e.target.value })}                        
                    />
                </div>
                < input type='hidden' name="_csrf" value={csrfSt.toString()} />
            </form>
        </div>
        )
}
export default ChatForm