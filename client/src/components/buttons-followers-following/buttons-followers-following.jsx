import React from 'react';
import CustomButton from '../button-custom/button-custom.component';


const ButtonsFollowersFollowing = () => {
    return (
        <div>
            <div className='btn-group'>
                <CustomButton blueBtn>Followers (0)</CustomButton>&nbsp;
                <CustomButton blueBtn>Following (0)</CustomButton>
            </div>
        </div>
        )
}
export default ButtonsFollowersFollowing;