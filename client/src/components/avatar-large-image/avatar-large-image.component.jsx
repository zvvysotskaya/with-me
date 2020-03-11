import React from 'react';

const md5 = require('md5');

const AvatarLargeImage = ({ posts }) => (

    <div>
        <img src={`https://gravatar.com/avatar/${md5(posts.author.email)}?s=128`} alt='avatar picture' className='img-fluid img_avatar_large' />&nbsp;&nbsp;&nbsp;
    </div>
);
export default AvatarLargeImage;