import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import CustomButton from '../button-custom/button-custom.component';


const ButtonFollower = ({ posts, arrLength }) => {

    return (
        <div>
            <Link to={`/followers-page/${posts.author.username}/follower`}><CustomButton blueBtn>Followers ( {arrLength} )</CustomButton></Link>
        </div>
    )
}
export default ButtonFollower