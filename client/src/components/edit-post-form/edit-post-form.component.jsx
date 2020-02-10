import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../../components/button-custom/button-custom.component'

const EditPostForm = ({ post }) => {
    
    // window.location.reload();
    const [val, setVal] = useState({
        title: post.title,
        body: post.body
    })
    const [mess, setMess] = useState({
        msg: ''
    })


    function handleSubmit(e) {
        e.preventDefault()       
        let data = {
            id: post._id,
            title: val.title,
            body: val.body
        }
        if (data) {
            fetch('/edit-post', {
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
            <div className='row justify-content-center mt-4'>
                <p><Link to={`/singlePost/${post._id}`} className='small font-weight-bold '>&laquo; Back to post permalink</Link></p>
                <div className='col-10 border rounded my-3'>
                    <div className={`alert text-center 
                            ${mess.msg === 'You must provide a post content.' ? 'alert-danger' : ''}
                            ${mess.msg === 'You must provide a title.' ? 'alert-danger' : ''}
                            ${mess.msg === 'The post updated successfully!' ? 'alert-success' : ''}
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
                                onChange={(e) => setVal({ ...val, title: e.target.value })}
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
                                onChange={(e) => setVal({ ...val, body: e.target.value })}
                            />
                        </div>
                        <div className='form-group'>
                            <CustomButton blueBtn type='submit'>Save Updates</CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditPostForm;
