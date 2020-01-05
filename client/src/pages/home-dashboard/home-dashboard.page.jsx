import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../../components/button-custom/button-custom.component'


const HomeDashboardPage = ({ history }) => {
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
        <CustomButton onClick={()=> history.push('/create-post-page')}>Create a New Post</CustomButton>
        {mess.message}
       
    </div>)
}
export default withRouter(HomeDashboardPage);