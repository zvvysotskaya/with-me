import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CardProfile from '../../components/card-profile/card-profile.component';
import AvatarProfile from '../../components/avatar-profile/avatar-profile.component';
import ButtonAddFollow from '../../components/button-add-follow/button-add-follow';
import ButtonDeleteFollow from '../../components/button-delete-follow/button-delete-follow.component'
import ButtonFollowing from '../../components/button-following/button-following.component';
import ButtonFollower from '../../components/button-follower/button-follower.component';
import CardPageLayout from '../../components/card-page-layout/card-page-layout.component';

const ProfilePage = ({ post, ...props }) => {

    let userPosts = props.match.params.username;
    
    const [val, setVal] = useState([])
    useEffect(() => {
        let isMounted = true
        fetch('/allPosts')
            .then(res => (res.json()))
            .then(res => {
                if (isMounted)
                setVal(res)})
            .catch((error) => (console.log(error)));
        return () => isMounted =false
    }, [])

    const [mess, setMess] = useState({
        msg: ''
    })
    useEffect(() => {   
        let isMounted = true
        fetch('/bbb')//check if anyone is loggedin
            .then(res => res.text())
            .then(res => {
                if (isMounted)
                setMess({ msg: res })
            })
            .catch(err => console.log(err)) 
        return () => isMounted = false
    }, [mess.msg])

    const [loggedIn, setLoggedIn] = useState({
        msg: ''
    })
    useEffect(() => {
        let isMounted = true
        fetch('/loggedUserId')//find logged userId from session
            .then(res => res.text())
            .then(res => {
                if (isMounted) {
                    setLoggedIn({ msg: res })
                }
            })
            .catch(err => console.log(err)) 
        return () => isMounted = false
    }, [])
    useEffect(() => { },[])
    let filtered = val.filter(el => el.author.username === userPosts)
    let author_id = filtered.map(el => el.author._id)//this is the profile owner's id

    //find out if id exists among following
    //find a count of the following and the followers to add it to the following and followers buttons
    //1. following count

    const [allFollowing, setAllFollowing] = useState([])
    useEffect(() => {
        let isMounted = true;
        
        axios.post('/allFollowingButton', { username: userPosts })
            .then(res => {
                if (isMounted) {
                    setAllFollowing(res.data)
                }
            })
            .catch(err => console.log(err))
        return () => isMounted=false
    }, [userPosts])
    
    //find out if id exists among following to check if the signed up user followes
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
    } else {
        console.log('Do not have any posts')
    }

    //find a count of the following and the followers to add numbers to following and followers buttons
    //1. count following
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
    }, [])
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
    //1. count followers
    const [followersCount, setFollowersCount] = useState([])
    useEffect(() => {
        axios.post('/allFollowers', { username: userPosts })
            .then(res => setFollowersCount(res.data))
            .catch(err => console.log(err))
    }, [])

  //  let arrFollowers = followersCount.map(el => el.authorId)
    let arrFollowers
    if (followersCount.length > 0 && followersCount != undefined && followersCount != null) {
        arrFollowers = followersCount.map(el => {
            if (el == undefined && el == null) {
                return
            } else {
                return el.authorId
            }
        })
    } else {
        followersCount[0] = 0
    }
    function count(array) {
        return array.length
    }
    
        function setButtonsFollow() {
            if (mess.msg === 'hello, there' && author_id[0] !== loggedIn.msg && author_id[0] !== followingAccount) {
                return filtered.map(posts => (<ButtonAddFollow key={posts._id} posts={posts} />))[0]
            } else {
                return filtered.map(posts => (<ButtonDeleteFollow key={posts._id} posts={posts} />))[0]
            }
        }
    
    
    return (
        <CardPageLayout>
        <div className='container'>
            <div className="card mt-md-3 mt-1">
                <div className="card-header">
                    <div className='col-md-12 d-flex justify-content-center'>
                        <div className='col-md-6 d-flex mt-4'>
                            { filtered.map(posts => ( <AvatarProfile key={posts._id} posts={posts} /> ) )[0] }
                        </div>
                        <div className='col-md-6 mt-4 '>
                                {setButtonsFollow()}
                        </div>
                    </div>
                </div>
                <div className="card-body text-center">                    
                    <div className='btn-group py-md-3 py-1'>
                        {mess.msg === 'hello, there' ? (filtered.map(posts => < ButtonFollower key={posts._id + 1} posts={posts} arrLength={count(arrFollowers)} />))[0] : ''}&nbsp;&nbsp;&nbsp;
                        {mess.msg === 'hello, there' ? (filtered.map(posts => < ButtonFollowing key={posts._id} posts={posts} arrLength={count(arrFollowing)}/>))[0] : ''}
                    </div>
                    <h5 className="card-title text-center text-dark">Blog Links</h5>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-10 my-md-3 my-1 text-left'>
                                { filtered.map(posts => ( <CardProfile key={ posts._id } posts={ posts } /> ) ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </CardPageLayout>
    )    
}
export default ProfilePage;