import React from 'react';
import DOMPurify from 'dompurify';

const CardAllPosts = ({ post }) => {

    //find author name    
    let username = JSON.stringify(post.author, ['username'])
    let onlyUsername = JSON.parse(username)
    
    return (<tbody>
        <tr>
            <td>
                <a href={`/singlePost/${post._id}`}>{DOMPurify.sanitize(post.title)}</a><br/>
                Posted by <kbd><a href={`/profile/${onlyUsername.username}`}>{DOMPurify.sanitize(onlyUsername.username)}</a></kbd> on {new Date(post.dateCreated).getMonth() + 1} / {new Date(post.dateCreated).getDate(post.dateCreated)} / {new Date(post.dateCreated).getFullYear()}
            </td>
        </tr>
    </tbody>
)
}
export default CardAllPosts;