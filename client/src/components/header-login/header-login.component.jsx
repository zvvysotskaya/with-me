import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LoginIcon } from '../../img/users.svg';

const HeaderLogin = () => {
    return (
        <div>
            <Link to='/login-page' className='login login_icon mt-3 d-flex justify-content-between'>
                <LoginIcon /><span className=' login_span text-decoration-none text-white'>Login / Sign Up</span>
            </Link>

        </div>)
}
export default HeaderLogin;