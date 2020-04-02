import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';

const SignUp = ({ history }) => {

    const [csrfSt, setCsrfSt] = useState('')
    useEffect(() => {
        fetch('/getCSRF')
            .then(res => res.text())
            .then(res => setCsrfSt(res))
            .catch(err => console.log(err))
    }, [])

    const [val, setVal] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    function handleSubmit(e) {
        e.preventDefault()
        let data = {
            username: val.username.trim().toLowerCase(),
            password: val.password,
            email: val.email.trim().toLowerCase(),
            confirmpassword: val.confirmpassword,
            _csrf: csrfSt.toString()
        }
        if (!validator.isEmail(data.email)) {
            alert('Sorry the email is not valid')
            return
        }
        if (validator.isEmpty(data.username) || validator.isEmpty(data.password) || validator.isEmpty(data.email)) {
            alert('The field cannot be empty')
            return
        }
        if (!validator.equals(data.password, data.confirmpassword)) {
            alert('Pasword does not match')
            return
        }
        if (data.password.length > 0 && data.password.length < 5) {
            alert('The password length should be more than 5 characters')
            return
        }
        if (data.password.length > 0 && data.password.length > 50) {
            alert('The password length cannot exceed 50 characters')
            return
        }
        if (!validator.isAlphanumeric(data.username)) {
            alert('Please enter letters or numbers')
            return
        }
        if (data) {
            fetch('/create-user', {
                method: 'POST',
                headers: { 'Content-type': 'Application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res=>(console.log(res)))
                .catch(err => (console.log(err)))
        }
        history.push('/')
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
                                type='email'
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
                                type='password'
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
                                type='password'
                                className="form-control"
                                name='confirmpassword'
                                placeholder='confirmpassword'
                                value={val.confirmpassword}
                                onChange={(e) => (setVal({ ...val, confirmpassword: e.target.value }))}
                                required />
                        </div>
                        < input type='hidden' name="_csrf" value={csrfSt.toString()} />
                        <input type="submit" className="btn btn-lg btn-danger" value="Submit" />
                        </form>
                </div>
            </div>
        </div>
    );
}
export default withRouter(SignUp);