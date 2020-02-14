import React from 'react'
import DOMPurify from 'dompurify'
const md5 = require('md5');


const AvatarProfile = ({ posts }) => (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='d-flex mt-2'>
                        <img src={`https://gravatar.com/avatar/${md5(posts.author.email)}?s=128`} alt='avatar picture' className='img-fluid avatar_tiny mb-4' />&nbsp;&nbsp;&nbsp;
                                    <h2>{DOMPurify.sanitize(posts.author.username)}</h2>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default AvatarProfile;