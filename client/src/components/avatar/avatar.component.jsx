import React, { useEffect, useState } from 'react';
import './avatar.styles.css'


const Avatar = () => {
    const [pic, setPik] = useState({
        image: ''
    })
    useEffect(() => {
        fetch('/avat')
            .then(res => res.text())
            .then(message => setPik({ image: message }))
            .then(message => console.log(message))
            .catch(err => (console.log(err)))
    }, [])
    return (
        <div>
            <div>
               <img src={pic.image} className='img-fluid img_avatar' />
            </div>

        </div>)
}
export default Avatar;