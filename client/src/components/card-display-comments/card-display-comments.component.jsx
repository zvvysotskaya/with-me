import React, { useState, useEffect } from 'react';
import CardPageLayout from '../card-page-layout/card-page-layout.component';

const CardDisplayComments = ({ comments }) => {
    //find commenter name
    const [uName, setUName] = useState([])
    useEffect(() => {
        fetch('/allUsers')
            .then(res => res.json())
            .then(res => setUName(res))
            .catch(er => console.log(er))
    }, [])
    
    let commenterName = uName.filter(el => el._id === comments.commenter).map(el => el.username)
    
    return (
        <div>
            <CardPageLayout bgLightBlue>
                <p>
                    Posted by {commenterName} on {new Date(comments.dateCreated).getMonth() + 1}
                    / {new Date(comments.dateCreated).getDate()} / {new Date(comments.dateCreated).getFullYear()}
                </p>
                <p>Comment: {comments.comment}</p>               
            </CardPageLayout>
        </div>
    )
}
export default CardDisplayComments;