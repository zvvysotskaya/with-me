import React from 'react';

const CardDisplayComments = ({ comments, postID, singlePostID }) => {
    console.log('POST%%%: ' + JSON.stringify(postID))
    return (<div>
        <p>Posted by on {new Date(comments.dateCreated).getMonth() + 1} / {new Date(comments.dateCreated).getDate()} / {new Date(comments.dateCreated).getFullYear()}</p>
        <p>{postID}</p>
        <p>Single post: {singlePostID}</p>
        <p>{comments.comment}</p>
        <hr />

    </div>)
}
export default CardDisplayComments;