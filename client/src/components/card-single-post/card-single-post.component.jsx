import React from 'react';
import './card-single-post.styles.css';
import DOMPurify from 'dompurify'


const md5 = require('md5');

const CardSinglePost = ({ post }) => {
   
    return (
        <div className='container'>
            <div className='row ' >
                <div className='col'>
                    <h1>Single Post Page</h1>
                    <h2 className='my-4 '>{post.title}</h2>
                    <div className='d-flex'>
                        <img src={`https://gravatar.com/avatar/${md5(post.author.email)}?s=128`} alt='avatar picture' className='img-fluid avatar_tiny mb-4' />&nbsp;&nbsp;&nbsp;
                        <p className='mt-3'>Posted by <a href={`/profile/${DOMPurify.sanitize(post.author.username)}`}>{DOMPurify.sanitize(post.author.username)}</a>&nbsp;
                            on {new Date(post.dateCreated).getMonth() + 1} / {new Date(post.dateCreated).getDate()} / {new Date(post.dateCreated).getFullYear()}
                        </p>
                    </div>
                    
                    <div>
                        {post.body}<br />
                        
                    </div>

                </div>
                
            </div>
        
        </div>
        )
    };
export default CardSinglePost; 