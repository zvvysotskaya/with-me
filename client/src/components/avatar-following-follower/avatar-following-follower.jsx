import React from 'react'

const md5 = require('md5');

const AvatarFollowingFollower = ({ posts }) => {

    return (
        <div>
            <img src={`https://gravatar.com/avatar/${md5(posts.email)}?s=128`} alt='avatar picture' className='img-fluid avatar_tiny' />&nbsp; &nbsp; &nbsp;
        </div>
    )
}
export default AvatarFollowingFollower