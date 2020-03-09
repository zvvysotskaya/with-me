import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


import CustomButton from '../../components/button-custom/button-custom.component';
import CardPageLayout from '../../components/card-page-layout/card-page-layout.component';

import AvatarLargeImage from '../../components/avatar-large-image/avatar-large-image.component';
import DashboardFeeds from '../../components/dashboard-feeds/dashboard-feeds.component';

const HomeDashboardPage = ({ history }) => {

    const [userPosts, setUserPosts] = useState({
        msg: ''
    })

    const [val, setVal] = useState([])

    const [allFollowing, setAllFollowing] = useState([])
    useEffect(() => {
    fetch('/aaa')
        .then(res => res.text())
        //.then(res => console.log('USERNAME: '+res))
        .then(res => setUserPosts({ msg: res }))
        .catch(er => console.log(er))
}, [])
    let str = userPosts.msg
    if (str == undefined) {
        console.log('USER POSTS IS UNDEFINED ****')
    } else {
        let myStr = str.slice(0, str.length)
        console.log('str: ' + myStr.toString())
    }

    useEffect(() => {
        fetch('/allPosts')
            .then(res => (res.json()))
            .then(res => setVal(res))
            .catch((error) => (console.log(error)));
    }, [])
        
    useEffect(() => {
        if (userPosts.msg == null || userPosts.msg == undefined) {
            console.log('Userpost is null!!!!!!!!!!!!!!!')
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
                <h3 className='text-center'>Hello {userPosts.msg}</h3>
                <div className='text-center mt-md-3'>{filtered == null ? '' : filtered.map(posts => (<AvatarLargeImage key={posts._id} posts={posts} />))[0]}</div>
                <div className='my-2 my-md-4 text-center'>
                    <CustomButton onClick={() => history.push('/create-post-page')}>Create a New Post</CustomButton>
                </div>
                
                {userPosts.msg ?
                    (<DashboardFeeds allFollowing={allFollowing} filtered={filtered} />) : ''
                }
            </CardPageLayout>
        </div>
    )
}
export default withRouter(HomeDashboardPage);