import React from 'react';
import DOMPurify from 'dompurify';

const CardAllPosts = ({ post }) => {

    //find author name    
    let username = JSON.stringify(post.author, ['username'])
    let onlyUsername = JSON.parse(username)
       
    return (
        <div>
        <p><a href={`/singlePost/${post._id}`}>{DOMPurify.sanitize(post.title)}</a></p>
            <p>
                Posted by <a href={`/profile/${onlyUsername.username}`}>{DOMPurify.sanitize(onlyUsername.username)}</a>&nbsp;
                on {new Date(post.dateCreated).getMonth() + 1} / {new Date(post.dateCreated).getDate(post.dateCreated)} / {new Date(post.dateCreated).getFullYear()}
            </p>
            <hr />
        </div>
)
}
export default CardAllPosts;