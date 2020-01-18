import React, { useState, useEffect } from 'react';
import CardSinglePost from '../../components/card-single-post/card-single-post.component';
import ButtonEdit from '../../components/button-edit/button-edit.component';
import ButtonDelete from'../../components/button-delete/button-delete.component'

const SinglePostScreenPage = ({ post, ...props }) => {
    let posts = props.match.params.id
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
            <div className='container'>
                <div className='row '>
                    <div className='col my-3 d-flex justify-content-end'>
                        <ButtonEdit />&nbsp;&nbsp;&nbsp;&nbsp;<ButtonDelete/>
                    </div>
                </div>
            </div>
            {val.filter((el) => el._id == posts).map(post => (<CardSinglePost key={post._id} post={post}/>)) }
        </div>)
}
export default SinglePostScreenPage