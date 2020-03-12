import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';


import CustomButton from '../../components/button-custom/button-custom.component';
import './login.styles.css';

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
            window.location ='/home-dashboard'
        } 
    }

    const [csrfSt, setCsrfSt] = useState('')
    useEffect(() => {
        fetch('/getCSRF')
            .then(res => res.text())
            .then(res => setCsrfSt(res))
            .catch(err => console.log(err))
    }, [])
   
    function handleSubmit(e) {
        e.preventDefault()
        let data = {
            email: val.email,
            password: val.password,
            _csrf: csrfSt.toString()
        }
        if (data) {
            fetch('/login-user', {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => res.text())
                .then(message => setMess({ message: message }))
                .then(() => history.push('/home-dashboard'))
                .catch(err => (console.log(err)))
            }
    }
    
    function reset() {
        setVal({
            email: '',
            password: ''
        })
    }
  //  console.log('CSRF****: ' + csrfSt)
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
                                    type='email'
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
                                    type='password'
                                    className="form-control"
                                    name='password'
                                    placeholder='Enter Your Password'
                                    value={val.password}
                                    onChange={(e) => (setVal({ ...val, password: e.target.value }))}
                                />
                              </div>
                              < input type='hidden' name="_csrf" value={csrfSt.toString()} />

                            <button type="submit" className="btn btn-block btn-danger " onClick={handleSubmit}>Login</button>
                        
                          </form>
                          <button type='text' onClick={reset} className="btn btn-block btn-info mt-2">Reset</button>
                        <p className='mt-2'> do not have an account?</p>
                        <CustomButton blueBtn onClick={()=>history.push('/sign-up-page')}>Sign Up</CustomButton>
                    </div>
                </div>
            </div>            
        </div>
    );
}
export default withRouter(LoginPage);