import React from 'react';
import DOMPurify from 'dompurify'


const CardAllPosts = ({ post}) => {
    return (
        <tbody>
            <tr>
                <td>
                    <a href={`/singlePost/${post._id}`}>{ DOMPurify.sanitize(post.title) }</a>
                </td>
            </tr>
        </tbody>)
}
export default CardAllPosts;