import React, { useState, useEffect } from 'react';

import CustomButton from '../../components/button-custom/button-custom.component'
import ButtonCommentsHideTextArea from '../../components/button-comments-form-hide-text-area/button-comments-form-hide-text-area.component';

const AddCommentstForm = ({ post , hideTextArea}) => {

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
        dis: false
    })
    useEffect(() => {
        setTimeout(()=>document.getElementById('focuss').focus(),360)
    }, [])
    function handleSubmit(e) {
        e.preventDefault()
        if (mess.msg === 'The comment is posted.') {
            setDisabledState({ dis: true })
            return
        }
        let data = {            
            postId: post,
            comment: val.comment,
            _csrf: csrfSt.toString()
        }
        if (data) {
            fetch('/post-comments', {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.text())
                .then(message => setMess({ msg: message }))
                .then(() => window.location.reload())
                .catch(err => (console.log(err)))
        }
    }
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-10 border rounded my-4'>
                    <div>
                        <ButtonCommentsHideTextArea hideTextArea={hideTextArea}/>
                        <h2 className='text-center'>Write Your Comment</h2>
                    </div>
                    <div className={`alert text-center 
                                ${mess.msg == 'Sorry, you must be loggedin.' ? 'alert-danger' : ''}
                            ${mess.msg == 'You must provide a content.' ? 'alert-danger' : ''}                           
                            ${mess.msg == 'The comment is posted.' ? 'alert-info' : ''}
                    `}>
                        {mess.msg}
                    </div>
                    <form onSubmit={handleSubmit} method='POST'>
                        <div className='form-group'>
                            <label >Content:</label>
                            <textarea
                                rows='10'
                                className='form-control'
                                type='text'
                                name='comment'
                                value={val.comment}
                                onChange={(e) => setVal({ ...val, comment: e.target.value })}
                                id='focuss'
                            />
                        </div>
                        < input type='hidden' name="_csrf" value={csrfSt.toString()} />
                        <div className='form-group text-center'>
                            <CustomButton blueBtn type='submit' disabled={disabledState.dis}>Post Comment</CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddCommentstForm;
