import React, { useState, useEffect } from 'react';

import CardAllPosts from '../../components/card-all-posts/card-all-posts.component';


const AllPostsPage = () => {

    const [val, setVal] = useState([])
    useEffect(() => {
        fetch('/allPosts')
            .then(res => res.json())
            .then(res => setVal(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="card">
                <div className="card-header bg-dark text-light text-center">
                    Blog Posts Links
                </div>
                <div className="card-body">
                    {val.map((post) => <CardAllPosts key={post._id} post={post} />)}                    
                </div>
            </div>
        </div>
    )
}
export default AllPostsPage;