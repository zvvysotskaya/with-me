import React, { useState, useEffect } from 'react';


const HomeDashboardPage = () => {
    const [mess, setMess] = useState({
        message: ''
    })
    useEffect(() => {
        fetch('/aaa')
            .then(res => res.text())
            .then(message => setMess({ message: message }))
            .catch(err => (console.log(err)))
    }, [])
    
    return (<div>
        <h1>Home dashboard</h1>
        {mess.message}
       
    </div>)
}
export default HomeDashboardPage;