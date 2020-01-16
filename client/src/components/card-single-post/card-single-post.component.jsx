import React from 'react';
import './card-single-post.styles.css';


const md5 = require('md5');

const CardSinglePost = ({ post }) => {
   
    return (
        <div className='container'>
            <div className='row ' >
                <div className='col'>
                    <h1>Single Post Page</h1>
                    <h2 className='my-4 '>{post.title}</h2>
                    <div>
                        <img src={`https://gravatar.com/avatar/${md5(post.author.email)}?s=128`} alt='avatar picture' className='img-fluid avatar_tiny mb-4'/>
                    </div>
                    <p>Posted by <a href={`/profile/${post.author.username}`}>{post.author.username}</a> on {new Date(post.dateCreated).getMonth() + 1} / {new Date(post.dateCreated).getDate()} / {new Date(post.dateCreated).getFullYear()}</p>
                    <div>
                        {post.body}<br />
                        
                    </div>

                </div>
                
            </div>
        
        </div>
        )
    };
export default CardSinglePost; 