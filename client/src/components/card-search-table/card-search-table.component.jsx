import React from 'react';
import DOMPurify from 'dompurify';

const CardSearchTable = ({ post }) => {

    //find author name    
    let username = JSON.stringify(post.author, ['username'])
    let onlyUsername = JSON.parse(username)

    return (<tbody>
        <tr>
            <td>
                <a href={`/singlePost/${post._id}`}>{DOMPurify.sanitize(post.title)}</a><br />
                <p>
                    Posted by <a href={`/profile/${onlyUsername.username}`}>{DOMPurify.sanitize(onlyUsername.username)}</a>&nbsp;
                     on {new Date(post.dateCreated).getMonth() + 1} / {new Date(post.dateCreated).getDate(post.dateCreated)} / {new Date(post.dateCreated).getFullYear()}
                </p>
            </td>
        </tr>
    </tbody>
    )
}
export default CardSearchTable;