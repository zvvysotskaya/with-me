import React, { useState, useEffect} from 'react';
import CardFollowingFollowers from '../../components/card-following-followers/card-following-followers.component';
import AvatarProfile from '../../components/avatar-profile/avatar-profile.component';
import axios from 'axios'

const FollowingPage = ({ post, ...props }) => {

    let userPosts = props.match.params.usernameFollowing;
    const [val, setVal] = useState([])
    
    useEffect(() => {
        fetch('/allPosts')
            .then(res => (res.json()))
            .then(res => setVal(res))
            .catch((error) => (console.log(error)));
    }, [])

    const [allFollowing, setAllFollowing] = useState([])

    useEffect(() => {
        axios.post('/allFollowing', { username: userPosts })
            .then(res => setAllFollowing(res.data ))
            .catch(err => console.log(err))
    }, [])

    let filtered = val.filter(el => el.author.username === userPosts)   
   
    return (
        <div className='container'>
            <div className="card">
                <div className="card-header">
                    <div className='col-md-12 d-flex justify-content-between'>
                        <div className='col-md-6 d-flex mt-4'>
                            { filtered.map( posts => (<AvatarProfile key={posts._id} posts={posts} /> ) )[0] }
                        </div>
                        <div className='col-md-6 mt-4 d-flex'>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title text-center">Following List</h5>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12 my-3'>
                                { allFollowing.map(posts => (< CardFollowingFollowers key={posts._id} posts={posts} /> ) ) } 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}
export default FollowingPage;