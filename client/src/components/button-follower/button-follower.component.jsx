import React from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../button-custom/button-custom.component';


const ButtonFollower = ({ posts, arrLength }) => {

    return (
        <div>
            <Link to={`/followers-page/${posts.author.username}/follower`}><CustomButton blueBtn>Followers ( {arrLength} )</CustomButton></Link>
        </div>
    )
}
export default ButtonFollower;