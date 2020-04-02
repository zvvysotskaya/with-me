import React, { useState, useEffect } from 'react';

import CustomButton from '../../components/button-custom/button-custom.component'


const CreatPostForm = () => {

    const [val, setVal] = useState({
        title: '',
        body: ''
    })

    const [mess, setMess] = useState({
        msg: ''
    })

    const [csrfSt, setCsrfSt] = useState('')
    useEffect(() => {
        fetch('/getCSRF')
            .then(res => res.text())
            .then(res => setCsrfSt(res))
            .catch(err => console.log(err))
    }, [])
    const [disabledState, setDisabledState] = useState({
        dis:false
    })

    function handleSubmit(e) {
        e.preventDefault()
        if (mess.msg === 'The post is created') {
            setDisabledState({ dis: true })
            return
        }
        let data = {
            title: val.title,
            body: val.body,
            _csrf: csrfSt.toString()
        }
        if (data) {
            fetch('/post-post', {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json'
                },
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
                <div className='col-md-10 border rounded my-4'>
                    <div>
                        <h2 className='text-center'>Create a New Post</h2>
                    </div>
                    <div className={`alert text-center 
                            ${mess.msg == 'You must provide a post content.' ? 'alert-danger' : ''}
                            ${mess.msg == 'You must provide a title.' ? 'alert-danger' : ''}
                            ${mess.msg == 'The post is created' ? 'alert-info' : ''}
                    `}>
                        {mess.msg}
                    </div>
                    <form onSubmit={handleSubmit} method='POST'>
                        <div className='form-group'>
                            <label >Title:</label>
                            <input
                                type='text'
                                className='form-control'
                                name='title'
                                value={val.title}
                                onChange={(e) => setVal({...val, title: e.target.value})}
                            />
                        </div>
                        <div className='form-group'>
                            <label >Post Content:</label>
                            <textarea
                                rows='10'
                                className='form-control'
                                type='text'
                                name='body'
                                value={val.body}
                                onChange={(e) => setVal({...val, body: e.target.value})}
                            />
                        </div>
                        < input type='hidden' name="_csrf" value={csrfSt.toString()} />
                        <div className='form-group text-center'>                            
                            <CustomButton blueBtn type='submit' disabled={disabledState.dis}>Create Post</CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default CreatPostForm;
