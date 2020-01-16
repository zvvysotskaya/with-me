import React from 'react';

const CardAllPosts = ({ post}) => {
    return (
        <div>
            <a href={`/singlePost/${post._id}`}>{post.title}</a>
        </div>
        )
}
export default CardAllPosts;