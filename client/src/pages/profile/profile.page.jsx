import React, { useState, useEffect } from 'react';
import axios from 'axios'

import CardProfile from '../../components/card-profile/card-profile.component';
import AvatarProfile from '../../components/avatar-profile/avatar-profile.component';
import ButtonAddFollow from '../../components/button-add-follow/button-add-follow';
import ButtonDeleteFollow from '../../components/button-delete-follow/button-delete-follow.component'
import ButtonFollowing from '../../components/button-following/button-following.component';
import ButtonFollower from '../../components/button-follower/button-follower.component';


const ProfilePage = ({ post, ...props }) => {

    let userPosts = props.match.params.username;
   
    
    const [val, setVal] = useState([])
    const [mess, setMess] = useState({
        msg: ''
    })
    const [loggedIn, setLoggedIn] = useState({
        msg: ''
    })
    const [allFollowing, setAllFollowing] = useState([])
    useEffect(() => {
        fetch('/allPosts')
            .then(res => (res.json()))
            .then(res => setVal(res))
            .catch((error) => (console.log(error)));
    }, [])
    useEffect(() => {   
        fetch('/bbb')//check if anyone is loggedin
            .then(res => res.text())
            .then(res => setMess({ msg: res }))
            .catch(err => console.log(err))
     
    }, [])
    useEffect(() => {       
        fetch('/loggedUserId')//find logged userId from session
            .then(res => res.text())
            .then(res => setLoggedIn({ msg: res }))
            .catch(err => console.log(err))   
    }, [])
    useEffect(() => {
       
        axios.post('/allFollowingButton', { username: userPosts })
            .then(res => setAllFollowing(res.data))
            .catch(err => console.log(err))
    }, [userPosts])
    let filtered = val.filter(el => el.author.username === userPosts)
    let author_id = filtered.map(el => el.author._id)//this is the profile owner's id
    //find out if id exists among following
    let followingAccount
    let arr
    
    if (allFollowing.length > 0 && allFollowing != undefined && allFollowing != null) {
        arr = allFollowing.map(el => {
            if (el == undefined || el == null) {
                console.log('Undefined')
                return
            } else {
                return el.follower
            }
        })
        
        if (arr.length > 0) {
            followingAccount = arr.find(el => {
                if (el != undefined && author_id[0] != undefined) {
                    return el.toString() === author_id[0].toString()
                } else {
                    return
                }
            })
        }
    }else {
        console.log('Do not have any posts')
    }

    //find a count of the following and the followers to add to the following and followers buttons
    //1. following count
    const [followingCount, setFollowingCount] = useState([])
    useEffect(() => {
        if (!userPosts) {
            console.log('ERROR!!!!!')
        } else {
            axios.post('/allFollowing', { username: userPosts })
                .then(res => setFollowingCount(res.data))
                .catch(err => console.log(err))
        }
        return () => followingCount;
    }, [followingCount])
    const [followersCount, setFollowersCount] = useState([])
    useEffect(() => {
        axios.post('/allFollowers', { username: userPosts })
            .then(res => setFollowersCount(res.data))
            .catch(err => console.log(err))
    }, [followersCount])
    let arrFollowing
    if (followingCount.length > 0 && followingCount != undefined && followingCount != null) {
        arrFollowing = followingCount.map(el => {
            if (el == undefined && el == null) {                
                return 
            } else {
                return el.follower
            }
        })
    } else {
        followingCount[0] = 0
    }
        
    let arrFollowers = followersCount.map(el => el.authorId)
    function count(array) {
        return array.length
    }

    return (
        <div className='container'>
            <div className="card">
                <div className="card-header">
                    <div className='col-md-12 d-flex justify-content-between'>
                        <div className='col-md-6 d-flex mt-4'>
                            { filtered.map(posts => ( <AvatarProfile key={posts._id} posts={posts} /> ) )[0] }
                        </div>
                        <div className='col-md-6 mt-4 d-flex'>
                            {(mess.msg === 'hello, there' && author_id[0] !== loggedIn.msg && followingAccount !== author_id[0]) ?
                                filtered.map(posts => (<ButtonAddFollow key={posts._id + 1} posts={posts} />))[0] : ''}
                            {(mess.msg === 'hello, there' && followingAccount === author_id[0]) ?
                                filtered.map(posts => ( <ButtonDeleteFollow key={ posts._id } posts={ posts } /> ) )[0] : '' }
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title text-center">Posts List</h5>
                    <div className='btn-group'>
                        {mess.msg === 'hello, there' ? (filtered.map(posts => < ButtonFollower key={posts._id + 1} posts={posts} arrLength={count(arrFollowers)} />))[0] : ''}&nbsp;&nbsp;&nbsp;
                        {mess.msg === 'hello, there' ? (filtered.map(posts => < ButtonFollowing key={posts._id} posts={posts} arrLength={count(arrFollowing)}/>))[0] : ''}
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12 my-3'>
                                { filtered.map(posts => ( <CardProfile key={ posts._id } posts={ posts } /> ) ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export default ProfilePage;