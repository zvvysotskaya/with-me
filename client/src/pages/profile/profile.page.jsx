import React, { useState, useEffect } from 'react';

import CardProfile from '../../components/card-profile/card-profile.component';
import AvatarProfile from '../../components/avatar-profile/avatar-profile.component';
import ButtonAddFollow from '../../components/button-add-follow/button-add-follow';
import ButtonsFollowersFollowing from '../../components/buttons-followers-following/buttons-followers-following';


const ProfilePage = ({post,...props }) => {
   
    let userPosts = props.match.params.username;
    const [val, setVal] = useState([])
    const [mess, setMess] = useState({
        msg: ''
    })
    const [message2, setMessage2] = useState({
        msg: ''
    })
    useEffect(() => {
        fetch('/allPosts')
            .then(res => (res.json()))
            .then(res => setVal(res))
            .catch((error) => (console.log(error)));
    }, []
    )
    useEffect(() => {
        fetch('/bbb')
            .then(res => res.text())
            .then(res => setMess({ msg: res }))
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        fetch('/loggedUserId')
            .then(res => res.text())
            .then(res => setMessage2({ msg: res }))
        .catch(err=>console.log(err))
    }, [])
    let filtered = val.filter(el => el.author.username === userPosts)
    let author_id = filtered.map(el => el.author._id)
    return (
        <div className='container'>            
                        <div className="card">
                            <div className="card-header">
                                <div className='col-md-12 d-flex justify-content-between'>
                                    <div className='col-md-6 d-flex mt-4'>
                                        {filtered.map(posts => (<AvatarProfile key={posts._id} posts={posts} />))[0]}
                                    </div>
                                    <div className='col-md-6 mb-4 d-flex'>
                                        {(mess.msg == 'hello, there' && author_id[0] !== message2.msg) ? filtered.map(posts => (< ButtonAddFollow key={posts._id} posts={posts} />))[0] : ''}
                                    </div>
                                </div>                                
                            </div>
                            <div className="card-body">
                    <h5 className="card-title text-center">Posts List</h5>
                    <div className='btn-group'>
                        
                        <ButtonsFollowersFollowing/>
                    </div>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-12 my-3'>                                            
                                            {filtered.map(posts => (<CardProfile key={posts._id} posts={posts} />))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </div>
    )
    
}
export default ProfilePage;