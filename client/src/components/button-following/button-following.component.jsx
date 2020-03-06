import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import CustomButton from '../button-custom/button-custom.component';


const ButtonFollowing = ({ posts, userPosts, arrLength }) => {
    
    return (
        <div>
            <Link to={`/following-page/${posts.author.username}/following`}><CustomButton blueBtn>Following ( {arrLength} )</CustomButton></Link>
        </div>
        )
}
export default ButtonFollowing;