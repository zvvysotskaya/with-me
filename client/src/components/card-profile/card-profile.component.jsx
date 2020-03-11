import React from 'react';
import DOMPurify from 'dompurify';

const CardProfile = ({ posts }) => (
    <div>
        <a href={`/singlePost/${posts._id}`}>{DOMPurify.sanitize(posts.title)}</a>
        <hr />
    </div>
);
export default CardProfile;