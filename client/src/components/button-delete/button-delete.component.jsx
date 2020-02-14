import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { ReactComponent as BinIcon } from '../../img/bin2.svg';

const ButtonDelete = ({ post,history }) => {
    
    function handleDelete(e) {
        e.preventDefault()
        let userInput = window.confirm(`Are you sure you want to delete the post ${DOMPurify.sanitize(post.title)}`)
        if (userInput) {
            axios.post('/delete-post', { id: post._id})
            .then(res => res.text())
                .then(history.push(`/profile/${post.author.username}`))
                .then(alert(`${DOMPurify.sanitize(post.title)} is deleted!!!!`))
                .catch(er => console.log(er))
        }
    }
    return (
        <div>
            <BinIcon  onClick={handleDelete} />
        </div>
        )
}
export default withRouter(ButtonDelete);
