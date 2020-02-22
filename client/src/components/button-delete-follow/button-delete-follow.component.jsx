import React, { useState } from 'react';
import axios from 'axios';
import {withRouter}from'react-router-dom'

import ButtonCustom from '../button-custom/button-custom.component'

const ButtonDeleteFollow = ({ posts, history }) => {
    const [message, setMessage] = useState({
        msg: ''
    })
    function handleDelete(e) {
        e.preventDefault()
        let userInput = window.confirm(`Are you sure you want to delete ${posts.author.username} ?`)
        if (userInput) {
            axios.post('/deleteFollow', { id: posts.author._id })             
                .then(message => setMessage({ msg: message.data }))
                .then(() => (history.push(`/`)))
                .catch(er=>console.log(er))
        }
    } 
    
    return (
        <div>
            <div>
                <p className={`alert text-center 
                    ${message.msg === 'The user is successfully deleted.' ? 'alert-success' : ''}
                    ${message.msg === 'We cannot delete that user.' ? 'alert-danger' : ''}
                `}>{message.msg}</p>
            </div>
            <ButtonCustom redBtn onClick={handleDelete}>Delete Follow</ButtonCustom>
        </div>
        )
}
export default withRouter(ButtonDeleteFollow)