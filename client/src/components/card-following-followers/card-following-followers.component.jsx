import React from 'react';
import DOMPurify from 'dompurify';
import AvatarFollowingFollower from '../avatar-following-follower/avatar-following-follower';

const CardFollowingFollowers = ({ posts }) => (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col d-flex'>
                    <div>
                        {<AvatarFollowingFollower key={posts._id} posts={posts} />}
                    </div>
                    <div className='mt-3'>
                        <a href={`/profile/${posts.username}`}>{DOMPurify.sanitize(posts.username)}</a>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    </div>
)
export default CardFollowingFollowers;