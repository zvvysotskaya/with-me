import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { ReactComponent as BinIcon } from '../../img/bin.svg';

const ButtonDelete = ({ post,history,...otherProps }) => {
    
    function handleDelete(e) {
        e.preventDefault()
       // alert('handle click in action!!!')
        let userInput = window.confirm(`Are you sure you want to delete the post ${post.title}`)
        if (userInput) {
            

            axios.post('/delete-post', { id: post._id})
            .then(res => res.text())
            .then(history.push(`/profile/${post.author.username}`))
            .then(alert(`${post.title} is deleted!!!!` + post._id))
                .catch(er => console.log(er))
        }
    }
    return (
        <div>
            <BinIcon {...otherProps} onClick={handleDelete} />
        </div>
        )
}
export default withRouter(ButtonDelete);
