import React from 'react';
import DOMPurify from 'dompurify';

const CardProfile = ({ posts }) => {
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div>
                            <a href={`/singlePost/${posts._id}`}>{DOMPurify.sanitize(posts.title)}</a>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        )
}
export default CardProfile;