import React, { useState, useEffect } from 'react';


import CardSinglePost from '../../components/card-single-post/card-single-post.component';
import ButtonEdit from '../../components/button-edit/button-edit.component';
import ButtonDelete from'../../components/button-delete/button-delete.component'

const SinglePostScreenPage = ({ post, ...props }) => {
    let posts = props.match.params.id
    const [val, setVal] = useState([])
    const [userId, setUserId] = useState({
        uId:''
    })
    useEffect(() => {
        fetch('/allPosts')
            .then(res => (res.json()))
            .then(res => setVal(res))
            .catch((error) => (console.log(error)));
    }, []
    );
    useEffect(() => {
        fetch('/loggedUserId')
            .then(res => res.text())
            .then(res => setUserId({ uId: res }))
            .catch(err => console.log(err))
    }, [])
    let filtered = val.filter((el) => el._id == posts)
    let userIdPost = filtered.map((el) => el.author._id)
    let userIdSessionLogged = userId.uId
    return (
        <div>
            <div className='container'>
                <div className='row '>
                    <div className='col my-3 d-flex justify-content-end'>
                        
                        {userIdPost == userIdSessionLogged ? filtered.map((post) => (<ButtonEdit key={post._id} post={post} />)) : '' }&nbsp;&nbsp;&nbsp;&nbsp;
                        {userIdPost == userIdSessionLogged ? filtered.map((post) => (< ButtonDelete key={post._id} post={post}/>)) : ''}
                    </div>
                </div>
            </div>
            {filtered.map(post => (<CardSinglePost key={post._id} post={post}/>)) }
        </div>)
}
export default SinglePostScreenPage