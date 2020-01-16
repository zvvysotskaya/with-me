import React, { useState, useEffect } from 'react';

const ProfilePage = ({ ab, ...props }) => {
    const usern = props.match.params.username

    return (
        <div>
            <h1>Profile</h1>
        </div>
        )
}
export default ProfilePage;