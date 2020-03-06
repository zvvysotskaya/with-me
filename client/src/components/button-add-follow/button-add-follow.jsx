import React, { useState, useEffect} from 'react';
import axios from 'axios';
import CustomButton from '../../components/button-custom/button-custom.component'
import { ReactComponent as AddUserIcon } from '../../img/user-plus.svg';


const ButtonAddFollow = ({ posts, ...props }) => {
    const [message, setMessage] = useState({
        messageFollow:''
    })
    const [csrfSt, setCsrfSt] = useState('')
    useEffect(() => {
        fetch('/getCSRF')
            .then(res => res.text())
            .then(res => setCsrfSt(res))
            .catch(err => console.log(err))
    }, [])

    let followedUser = posts.author.username
    function addFollow(e) {
        e.preventDefault()
        let data = {
            follower: followedUser,
            authorId: posts.author._id,
            _csrf: csrfSt.toString()
        }
        axios.post('/follow', data)
            .then(res => setMessage({messageFollow: res.data}))
            .catch(err=>console.log(err))
    }
    return (
        <div>
            <div className={`alert text-center ${message.messageFollow === `Successfully followed ${followedUser}` ? 'alert-success' : ''}
                ${message.messageFollow === `You are already following this user.` ? 'alert-danger' : ''}
                ${message.messageFollow === `Sorry, you are the owner the profile.` ? 'alert-danger' : ''}
            `}>
                {message.messageFollow}
            </div>
            <CustomButton blueBtn onClick={addFollow}{...props}>Follow &nbsp;<AddUserIcon /></CustomButton>
        </div>
    )
}
export default ButtonAddFollow;