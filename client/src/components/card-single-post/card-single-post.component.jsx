import React from 'react';

const CardSinglePost = ({ post }) => {
   
    return (
        <div className='container'>
            <div className='row ' >
                <div className='col'>
                    <h1>Single Post Page</h1><h1>{post.title}</h1>
                    <div>
                        <img src='' alt='avatar picture' className='img-fluid avatar_tiny'/>
                    </div>
                    <p>Posted by {post.author.username} on {new Date(post.dateCreated).getMonth() + 1} / {new Date(post.dateCreated).getDate()} / {new Date(post.dateCreated).getFullYear()}</p>
                    <div>
                        {post.body}<br />
                        {post.authorId}
                    </div>

                </div>
                
            </div>
        
        </div>
        )
    };
export default CardSinglePost; 