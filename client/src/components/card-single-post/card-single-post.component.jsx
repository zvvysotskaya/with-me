import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

import './card-single-post.styles.css';
import ButtonAddComments from '../button-add-comments/button-add-comments.component';
import AddCommentsForm from '../add-comments-form/add-comments-form.component';
import CardDisplayComments from '../card-display-comments/card-display-comments.component';

const md5 = require('md5');

const CardSinglePost = ({ post, singlePostID, commentsNum }) => {
    const[val,setVal]=useState('')
    function btnClick() {
        setVal(<AddCommentsForm post={post._id} hideTextArea={hideTextArea} />)
    }
    function hideTextArea() {
        setVal('')
    }
    //find loggedin the user to create a commenter id
    const [commenterId, setCommenterId] = useState('')
    useEffect(() => {
        fetch('/loggedUserId')
            .then(res => res.text())
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
            .then(res => setMess({msg: res}))
        .catch(er=>console.log(er))
    }, [])
   
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
    //get all comments
    const [valComments, setValComments] = useState([])
    useEffect(() => {
        fetch('/allComments')
            .then(res => res.json())
            .then(res => setValComments(res))
            .catch(err => console.log(err))
    }, [])

    let filteredBySinglePost = valComments.filter(el => singlePostID === el.postId)

    commentsNum = filteredBySinglePost.length
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
                    <p className='text-left'><kbd>{commentsNum} comments</kbd></p>
                </div>
            </div>
            <div className="card-body">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 my-3'>
                            {post.body}<br />
                            <hr />
                            <div className='my-4'>
                                {hideButtonAddComments()}
                                <div className='py-4'>
                                    {val}
                                </div>
                                <h3 className='py-1'>Comments</h3>

                                {filteredBySinglePost.map(comments => < CardDisplayComments key={comments._id} comments={comments} />)}
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