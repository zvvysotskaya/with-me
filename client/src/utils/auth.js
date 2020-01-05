import React, { useState, useEffect } from 'react';

 export const auth = ()=>{
    const [mess, setMess] = useState({
        msg: ''
    })
    useEffect(() => {
        fetch('/bbb')
            .then(res => res.text())
            .then(message => setMess({ msg: message }))
            .catch(err => console.log(err))
    }, [])

    
        if (mess.msg !== '') {
            return true
        }
        else {
            return false
        }
    
}
