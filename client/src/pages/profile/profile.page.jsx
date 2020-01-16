import React, { useState, useEffect } from 'react';
import CardProfile from '../../components/card-profile/card-profile.component';

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
    return (
        <div>
            <h1>Profile</h1>
            {val.filter(el => el.author.username == userPosts).map(posts => (<CardProfile key={posts._id} posts={posts} />))}
        </div>
    )
    
}
export default ProfilePage;