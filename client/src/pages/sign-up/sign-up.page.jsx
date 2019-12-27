import React, { useState } from 'react';
import validator from 'validator'

import './sign-up.styles.css'


const SignUp = () => {
    const [val, setVal] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })
    function handleSubmit(e) {
        e.preventDefault()
        let data = {
            username: val.username,
            password: val.password,
            email: val.email,
            confirmpassword: val.confirmpassword
        }
        if (!validator.isEmail(data.email)) {
            alert('Sorry the email is not valid')
            return
        }
        if (validator.isEmpty(data.username) || validator.isEmpty(data.password) || validator.isEmpty(data.email)) {
            alert('The field cannot be empty')
        }
        if (!validator.equals(data.password, data.confirmpassword)) {
            alert('Pasword does not match')
        }
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-5 col-sm-8 justify-content-center border rounded mt-md-5 mt-0 mb-md-5 p-5'>
                    <h3 className='text-center mt-3 mb-3'>Create an Account</h3>
                   
                    <form onSubmit={handleSubmit} method="POST">
                        
                        <div className='form-group' >
                            <label>User Name:</label>
                            <input
                                type='text'
                                className="form-control"
                                name="username"
                                placeholder='Enter Your Name'
                                value={val.username}
                                onChange={(e) => (setVal({ ...val, username: e.target.value }))}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input
                                type='text'
                                className="form-control email"
                                name='email'
                                placeholder='Email'
                                value={val.email}
                                onChange={(e) => (setVal({ ...val, email: e.target.value }))}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input
                                type='text'
                                className="form-control"
                                name='password'
                                placeholder='Password'
                                value={val.password}
                                onChange={(e) => (setVal({...val, password: e.target.value}))}
                                required />
                        </div>
                        <div className='form-group'>
                            <label>Confirm Password:</label>
                            <input
                                type='text'
                                className="form-control"
                                name='confirmpassword'
                                placeholder='confirmpassword'
                                value={val.confirmpassword}
                                onChange={(e) => (setVal({ ...val, confirmpassword: e.target.value }))}
                                required />
                        </div>
                        <input type="submit" className="btn btn-lg btn-danger" value="Submit" />
                        </form>
                </div>
            </div>
        </div>
    );
}
export default SignUp;