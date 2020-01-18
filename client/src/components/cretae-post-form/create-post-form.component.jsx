import React, { useEffect, useState } from 'react';

import CustomButton from '../../components/button-custom/button-custom.component'

const CreatPostForm = () => {
    // window.location.reload();
    const [val, setVal] = useState({
        title: '',
        body: ''
    })
    const [mess, setMess] = useState({
        msg: ''
    })
    
    
    function handleSubmit(e) {
        e.preventDefault()
        alert('Hello!!')
        let data = {
            title: val.title,
            body: val.body
        }
        if (data) {
            fetch('post-post', {
                method: 'POST',
                headers: { 'Content-type': 'Application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.text())
                .then(message => setMess({ msg: message }))                
                .catch(err => (console.log(err)))
        }
    }
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-10 border rounded my-3'>
                    {mess.msg}
                    <form onSubmit={handleSubmit} method='POST'>
                        <div className='form-group'>
                            <label for="title">Title:</label>
                            <input
                                type='text'
                                className='form-control'
                                name='title'
                                value={val.title}
                                onChange={(e) => setVal({...val, title: e.target.value})}
                            />
                        </div>
                        <div className='form-group'>
                            <label for="body">Post Content:</label>
                            <textarea
                                className='form-control'
                                type='text'
                                name='body'
                                value={val.body}
                                onChange={(e) => setVal({...val, body: e.target.value})}
                            />
                        </div>
                        <div className='form-group'>
                            <CustomButton blueBtn type='submit'>Create</CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default CreatPostForm;
