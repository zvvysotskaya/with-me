import React from 'react';

import CardFollowingFollowers from '../card-following-followers/card-following-followers.component';
import AvatarProfile from '../avatar-profile/avatar-profile.component';
import CardEmptyFeed from '../card-empty-feed/card-empty-feed.component';

const CardOfCardsFollowing = ({ filtered, allFollowing }) => {

    return (
        <div className='container'>
            <div className="card">
                <div className="card-header">
                    <div className='col-md-12 d-flex justify-content-between'>
                        <div className='col-md-6 d-flex mt-4'>
                            {filtered.map(posts => (<AvatarProfile key={posts._id} posts={posts} />))[0]}
                        </div>
                        <div className='col-md-6 mt-4 d-flex'>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title text-center">The Feeds from Those You are Following</h5>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12 my-3'>
                                {
                                    (allFollowing.length === 0 && allFollowing == null) ?
                                        (filtered == null ? '' :
                                            (filtered.map(posts => {
                                                if (posts == null) {
                                                    return
                                                } else {
                                                    return (<CardEmptyFeed key={posts._id} posts={posts} />)
                                                }
                                            }))[0]) :
                                        ((allFollowing == null || allFollowing == '') ? '' :
                                            ((allFollowing == null || allFollowing == '') ? '' :
                                                allFollowing.map(posts => {
                                                    if (posts == null) {
                                                        return
                                                    } else {
                                                        return (< CardFollowingFollowers key={posts._id} posts={posts} />)
                                                    }
                                                })
                                            )
                                        )   
                               }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardOfCardsFollowing;