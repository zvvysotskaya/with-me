import React from 'react';
import DOMPurify from 'dompurify';

import './card-single-post.styles.css';

const md5 = require('md5');

const CardSinglePost = ({ post }) => (

    <div className='container'>
        <div className="card">
            <div className="card-header">
                <div className='col-md-10 text-center'>
                    <h2 className='my-4 '>{DOMPurify.sanitize(post.title)}</h2>
                    <div className='d-flex'>
                        <img src={`https://gravatar.com/avatar/${md5(post.author.email)}?s=128`} alt='avatar picture' className='img-fluid img_avatar_large mb-4' />&nbsp;&nbsp;&nbsp;
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
export default CardSinglePost; 