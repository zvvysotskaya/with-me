import React, { useState} from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../../components/button-custom/button-custom.component';

const LoginPage = ({ history }) => {

    const [val, setVal] = useState({
        email: '',
        password: ''
    })
    const [mess, setMess] = useState({
        message: ''
    })
    function redir() {
        if (mess.message === 'Congrats!') {
            localStorage.setItem('user', JSON.stringify(mess.message))
            window.location = '/home-dashboard'
        }
    }
    function handleSubmit(e) {
        e.preventDefault()
        let data = {
            email: val.email,
            password: val.password
        }
        if (data) {
            fetch('/api/login-user', {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => res.text())
                .then(message => setMess({ message: message }))
                .catch(err => (console.log(err)))
        }
    }
   
    return (
        <div>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-5 col-sm-8 justify-content-center border rounded mt-md-5 mt-0 mb-md-5 p-5'>
                        <h3 className='text-center mt-3 mb-3'>Login</h3>
                        <div className='message-background'>
                            <p className=''> {mess.message}</p>
                        </div>

                        <p id='validationForm'></p>
                        <form onSubmit={handleSubmit} method='POST'>
                            <div className='form-group'>
                                <label>Email:</label>
                                <input
                                    type='text'
                                    className="form-control"
                                    name='email'
                                    placeholder='email'
                                    value={val.email}
                                    onChange={(e) => (setVal({ ...val, email: e.target.value }))}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Password:</label>
                                <input
                                    type='text'
                                    className="form-control"
                                    name='password'
                                    placeholder='Enter Your Password'
                                    value={val.password}
                                    onChange={(e) => (setVal({ ...val, password: e.target.value }))}
                                />
                            </div>
                            <button type="submit" className="btn btn-lg btn-danger" onClick={handleSubmit}>Login</button>&nbsp;
                            <button type='submit' onClick={redir()} className="btn btn-lg btn-danger">Reset</button>
                        </form>
                        <p className='mt-2'> do not have an account?</p>
                        <CustomButton blueBtn onClick={() => history.push('/sign-up-page')}>Sign Up</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default withRouter(LoginPage);