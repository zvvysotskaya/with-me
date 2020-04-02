import React, { useState, useEffect } from 'react';

import EditPostForm from '../../components/edit-post-form/edit-post-form.component';

const EditPostPage = ({ ...props }) => {

    let posts = props.match.params.id
    const [val, setVal] = useState([])
    useEffect(() => {
        fetch('/allPosts')
            .then(res => (res.json()))
            .then(res => setVal(res))
            .catch((error) => (console.log(error)));
    }, []
    )

    let filtered = val.filter((el) => el._id == posts)

    return (
        <div>
            {filtered.map((post) => (< EditPostForm key={post._id} post={post} />))}
        </div>
    )
}
export default EditPostPage;