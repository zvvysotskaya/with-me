import React from 'react';



const CardProfile = ({ posts}) => {
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div>
                            <a href={`/singlePost/${posts._id}`}>{posts.title}</a>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        )
}
export default CardProfile;