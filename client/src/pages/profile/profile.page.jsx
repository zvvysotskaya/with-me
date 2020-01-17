import React, { useState, useEffect } from 'react';
import CardProfile from '../../components/card-profile/card-profile.component';
import AvatarProfile from '../../components/avatar-profile/avatar-profile.component';


const ProfilePage = ({post,...props }) => {
   
    let userPosts = props.match.params.username;
    const [val, setVal] = useState([])
    useEffect(() => {
        fetch('/allPosts')
            .then(res => (res.json()))
            .then(res => setVal(res))
            .catch((error) => (console.log(error)));
    }, []
    )
    let filtered = val.filter(el => el.author.username == userPosts)
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Profile</h1>
                    <div className='container'>
                            <div className='row'>
                                    <div className='col'>
                                        <div className='d-flex mt-2'>                                  
                                            { filtered.map(posts => (<AvatarProfile key={posts._id} posts={posts} />))[0] }                                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                    { filtered.map(posts => (<CardProfile key={posts._id} posts={posts} />)) }
                </div>
            </div>
            
        </div>
    )
    
}
export default ProfilePage;