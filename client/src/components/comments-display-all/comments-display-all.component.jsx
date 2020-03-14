import React, { useState, useEffect } from 'react';
import CardDisplayComments from '../card-display-comments/card-display-comments.component'

const CommentsDisplayAll = ({ post, singlePostID}) => {
    const [val, setVal] = useState([])
    useEffect(() => {
        fetch('/allComments')
            .then(res => res.json())
            .then(res => setVal(res))
            .catch(err => console.log(err))
    },[])
    return (
        <div>
            {val.map(com => (<CardDisplayComments key={com._id} comments={com} postID={post} singlePostID={singlePostID}/>))}
        </div>
    )
}
export default CommentsDisplayAll;