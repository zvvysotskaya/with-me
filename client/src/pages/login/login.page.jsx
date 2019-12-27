import React from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../../components/button-custom/button-custom.component'

const LoginPage = ({ history }) => {
    function handleSubmit(e) {
        e.preventDefault()
        alert('Hello!!!')
    }
    return (
        <div>
            
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-5 col-sm-8 justify-content-center border rounded mt-md-5 mt-0 mb-md-5 p-5'>
                        <h3 className='text-center mt-3 mb-3'>Login</h3>
                        <p id='validationForm'></p>
                        <form onSubmit={handleSubmit} method='POST'>
                            <div className='form-group'>
                                <label>Email:</label>
                                <input
                                    type='text'
                                    className="form-control"
                                    name='email'
                                    placeholder='email'
                                    value
                                    onChange

                                />
                            </div>
                            <div className='form-group'>
                                <label>Password:</label>
                                <input
                                    type='text'
                                    className="form-control"
                                    name='password'
                                    placeholder='Enter Your Password'
                                    value
                                    onChange
                                />
                            </div>
                            <button type="submit" className="btn btn-lg btn-danger">Login</button>&nbsp;
                        <button type='submit' className="btn btn-lg btn-danger">Reset</button>
                        </form>
                        <p> do not have an account?</p>
                        <CustomButton blueBtn onClick={()=>history.push('/sign-up-page')}>Sign Up</CustomButton>

                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default withRouter(LoginPage);