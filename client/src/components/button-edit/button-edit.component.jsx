import React from 'react';


import {ReactComponent as PencilIcon} from '../../img/pencil.svg'

const ButtonEdit = ({post}) => {

    return (
        <div>
            <a href={`/post/${post._id}/edit`}><PencilIcon/></a>
        </div>
        )
}
export default ButtonEdit