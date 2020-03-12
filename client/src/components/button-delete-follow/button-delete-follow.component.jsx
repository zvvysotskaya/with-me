import React, { useState, useEffect } from 'react';
import axios from 'axios';


import ButtonCustom from '../button-custom/button-custom.component'

const ButtonDeleteFollow = ({ posts }) => {

    const [message, setMessage] = useState({
        msg: ''
    })

    const [csrfSt, setCsrfSt] = useState('')
    useEffect(() => {
        fetch('/getCSRF')
            .then(res => res.text())
            .then(res => setCsrfSt(res))
            .catch(err => console.log(err))
    }, [])
 
    useEffect((e) => {
        if (e == undefined) {
            return
        }
        handleDelete(e)
        return () => handleDelete(e)
    },[])
    function handleDelete(e) {
        e.preventDefault()
        let userInput = window.confirm(`Are you sure you want to delete ${posts.author.username} ?`)
        if (userInput) {
            axios.post('/deleteFollow', { id: posts.author._id, _csrf: csrfSt.toString() })
                .then(message => setMessage({ msg: message.data }))
                .catch(er => console.log(er))
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
export default ButtonDeleteFollow