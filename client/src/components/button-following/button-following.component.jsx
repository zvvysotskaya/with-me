import React from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../button-custom/button-custom.component';

const ButtonFollowing = ({ posts, arrLength }) => {
    
    return (
        <div>
            <Link to={`/following-page/${posts.author.username}/following`}><CustomButton blueBtn>Following ( {arrLength} )</CustomButton></Link>
        </div>
        )
}
export default ButtonFollowing;