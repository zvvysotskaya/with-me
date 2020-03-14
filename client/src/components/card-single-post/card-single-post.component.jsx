import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

import './card-single-post.styles.css';
import ButtonAddComments from '../button-add-comments/button-add-comments.component';
import AddCommentsForm from '../add-comments-form/add-comments-form.component';
import CommentsDisplayAll from '../comments-display-all/comments-display-all.component';

const md5 = require('md5');

const CardSinglePost = ({ post, singlePostID }) => {
    const[val,setVal]=useState('')
    function btnClick() {
        setVal(<AddCommentsForm post={post._id} hideTextArea={hideTextArea} />)
    }
    function hideTextArea() {
        setVal('')
    }
    //find commenter id
    const [commenterId, setCommenterId] = useState('')
    useEffect(() => {
        fetch('/loggedUserId')
            .then(res => res.text())
           // .then(res => console.log('commenterId: '+ res))
            .then(res => setCommenterId(res))
            .catch(er => console.log(er))
    }, [])
    //check if a user is loggedin
    const [mess, setMess] = useState({
        msg: ''
    })
    useEffect(() => {
        fetch('/bbb')
            .then(res => res.text())
            // .then(res => console.log('logged in***: ' + res))
            .then(res => setMess({msg: res}))
        .catch(er=>console.log(er))
    }, [])
    console.log('Message#######: ' + mess.msg)
    function hideButtonAddComments() {
        if (commenterId == undefined && post.author._id == undefined) {
            return
        }
        if (mess.msg !== 'hello, there') {
            return ''
        } 

        
        if (mess.msg === 'hello, there') {

            return (<ButtonAddComments post={post._id} btnClick={btnClick} />)
        }
    }
    console.log('COMMENTER: ' + JSON.stringify(commenterId))
    console.log('author of the post: ' + post.author._id)
    return (<div className='container'>
        <div className="card">
            <div className="card-header">
                <div className='col-md-10 text-center'>
                    <h2 className='my-4 '>{DOMPurify.sanitize(post.title)}</h2>
                    <div className='d-flex'>
                        <img src={`https://gravatar.com/avatar/${md5(post.author.email)}?s=128`} alt='avatar' className='img-fluid img_avatar_large mb-4' />&nbsp;&nbsp;&nbsp;
                        <p className='mt-3'>Posted by <a href={`/profile/${DOMPurify.sanitize(post.author.username)}`}>{DOMPurify.sanitize(post.author.username)}</a>&nbsp;
                        on {new Date(post.dateCreated).getMonth() + 1} / {new Date(post.dateCreated).getDate()} / {new Date(post.dateCreated).getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 my-3'>
                            {post.body}<br />
                            <div className='my-4'>
                                {hideButtonAddComments()}
                                <div >
                                    {val}
                                </div>
                                <h3>Comments</h3>
                                <CommentsDisplayAll post={post.author.username} singlePostID={singlePostID} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}
export default CardSinglePost; 