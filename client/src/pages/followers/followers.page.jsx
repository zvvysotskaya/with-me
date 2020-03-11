import React, { useState, useEffect } from 'react';
import CardFollowingFollowers from '../../components/card-following-followers/card-following-followers.component';
import AvatarProfile from '../../components/avatar-profile/avatar-profile.component';
import CardPageLayout from '../../components/card-page-layout/card-page-layout.component';

import axios from 'axios'

const FollowersPage = ({ post, ...props }) => {

    let userPosts = props.match.params.username;
    const [val, setVal] = useState([])

    useEffect(() => {
        fetch('/allPosts')
            .then(res => (res.json()))
            .then(res => setVal(res))
            .catch((error) => (console.log(error)));
    }, [])

    const [allFollowers, setAllFollowers] = useState([])

    const [csrfSt, setCsrfSt] = useState('')
    useEffect(() => {
        fetch('/getCSRF')
            .then(res => res.text())
            .then(res => setCsrfSt(res))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.post('/allFollowers', { username: userPosts, _csrf: csrfSt.toString() })
         //   .then(res=>console.log(res.data))
            .then(res => setAllFollowers(res.data))
            .catch(err => console.log(err))
    }, [])

    let filtered = val.filter(el => el.author.username === userPosts)

    return (
        <CardPageLayout>
        <div className='container'>
            <div className="card mt-md-3 mt-1">
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
                    <h5 className="card-title text-center text-dark">Your Followers Feeds</h5>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-10 my-3'>
                                {allFollowers === null ? '' : allFollowers.map(posts => (< CardFollowingFollowers key={posts._id} posts={posts} />))}                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </CardPageLayout>
    )
}
export default FollowersPage;