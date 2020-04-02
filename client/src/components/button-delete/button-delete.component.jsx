import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { ReactComponent as BinIcon } from '../../img/bin2.svg';

const ButtonDelete = ({ post, history }) => {

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
    }, [])

    function handleDelete(e) {
        e.preventDefault()
        let userInput = window.confirm(`Are you sure you want to delete the post ${DOMPurify.sanitize(post.title)}`)
        if (userInput) {
            axios.post('/delete-post', { id: post._id, _csrf: csrfSt.toString() })
                .then(res => res.text())
                .then(history.push(`/profile/${post.author.username}`))
                .then(alert(`${DOMPurify.sanitize(post.title)} is deleted!!!!`))
                .catch(er => console.log(er))
        }
    }

    return (
        <div>
            <BinIcon onClick={handleDelete} />
        </div>
        )
}
export default withRouter(ButtonDelete);
