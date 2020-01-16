import React from 'react';
import {Link}from 'react-router-dom'

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <p><Link to='/all-posts-page'>link to all posts</Link></p>
        </div>
    );
}
export default HomePage;