import React from 'react';
import axios from 'axios';
import CustomButton from '../../components/button-custom/button-custom.component'
import {ReactComponent as AddUserIcon }from'../../img/user-plus.svg'

const ButtonAddFollow = ({ posts,...props }) => {
    function addFollow(e) {
        e.preventDefault()
        let data = {
            followedUserName: posts.author.username,
            authorId: posts.author._id
        }
        axios.post('/follow', data)
            .then((res)=>console.log(res))
            .catch('Hello, I am axios and I am here')

    }
    return (
        <div>
            <CustomButton blueBtn onClick={addFollow}{...props}>Follow &nbsp;<AddUserIcon /></CustomButton>
        </div>
    )
}
export default ButtonAddFollow;