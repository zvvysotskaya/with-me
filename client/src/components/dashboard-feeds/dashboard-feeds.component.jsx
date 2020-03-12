import React from 'react';
import CardFollowingFollowers from '../card-following-followers/card-following-followers.component';
import CardEmptyFeed from '../card-empty-feed/card-empty-feed.component';

const DashboardFeeds = ({ filtered, allFollowing }) => (
   
        <div>
            <div className="card">
                <div className="card-header bg-dark text-light text-center">
                    The Feeds from Those You are Following
                </div>
                <div className="card-body">
                    {
                        (allFollowing.length === 0 && allFollowing == null) ?
                            (filtered == null ? '' :
                                (filtered.map(posts => {
                                    if (posts == null) {
                                        console.log('n')
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
    )

export default DashboardFeeds;