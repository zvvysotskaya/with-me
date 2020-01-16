import React from 'react';

const CardProfile = ({ posts}) => {
    return (
        <div>
            <a href={`/singlePost/${posts._id}`}>{posts.title}</a>
            <hr />
        </div>
        )
}
export default CardProfile;