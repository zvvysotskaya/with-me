import React from 'react'
import DOMPurify from 'dompurify'
const md5 = require('md5');

const AvatarProfile = ({ posts }) => (
    <div>
        <div className='d-flex '>
            <img src={`https://gravatar.com/avatar/${md5(posts.author.email)}?s=128`} alt='avatar picture' className='img-fluid img_avatar_large' />&nbsp;&nbsp;&nbsp;
            <h2>
                { DOMPurify.sanitize( posts.author.username ) }
            </h2>
        </div>
    </div>
);
export default AvatarProfile;