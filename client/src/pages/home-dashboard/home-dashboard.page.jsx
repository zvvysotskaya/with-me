import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import CustomButton from '../../components/button-custom/button-custom.component';
import CardPageLayout from '../../components/card-page-layout/card-page-layout.component';
import AvatarLargeImage from '../../components/avatar-large-image/avatar-large-image.component';
import DashboardFeeds from '../../components/dashboard-feeds/dashboard-feeds.component';

const HomeDashboardPage = ({ history }) => {

    const [allFollowing, setAllFollowing] = useState([])
    useEffect(() => {
    fetch('/aaa')
        .then(res => res.text())       
        .then(res => setUserPosts({ msg: res }))
        .catch(er => console.log(er))
    }, [])

    const [val, setVal] = useState([])
    useEffect(() => {
        fetch('/allPosts')
            .then(res => (res.json()))
            .then(res => setVal(res))
            .catch((error) => (console.log(error)));
    }, [])

    const [userPosts, setUserPosts] = useState({
        msg: ''
    })
    useEffect(() => {
        if (userPosts.msg == null || userPosts.msg == undefined) {  
            return
        } else {
            axios.post('/allFollowing', {
                username: userPosts.msg
            })
                .then(res => setAllFollowing(res.data))
                .catch(er => console.log(er))
        }
    }, [userPosts.msg])

    let filtered = val.filter(el => el.author.username === userPosts.msg)   
    
    return (
        <div className='container'>
            <CardPageLayout>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-md-10'>
                            <div className='text-center mt-md-3 mt-1'>
                                {filtered == null ? '' : filtered.map(posts => (<AvatarLargeImage key={posts._id} posts={posts} />))[0]}
                            </div>
                            <h3 className='text-center mt-1 mt-md-3'>Hello {userPosts.msg}</h3>
                            <div className='my-2 my-md-4 text-center'>
                                <CustomButton onClick={() => history.push('/create-post-page')}>Create a New Post</CustomButton>
                            </div>
                            <div>
                                {userPosts.msg ?
                                    (<DashboardFeeds allFollowing={allFollowing} filtered={filtered} />) : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </CardPageLayout>
        </div>
    )
}
export default withRouter(HomeDashboardPage);