import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../img/home3.svg';
import { ReactComponent as LoginIcon } from '../../img/users.svg';

import './header.styles.css'


const Header = () => {
    return (
        <div className='header '>
            <div className='container'>
                <div className='row'>
                    <div className='col-2 d-flex justify-content-between'>
                        <Link to='/' className='home_icon'><HomeIcon /></Link>
                    </div>
                    <div className='col-10 d-flex justify-content-end '>
                        <Link to='login-page' className='login login_icon mt-3 d-flex justify-content-between'>
                            <LoginIcon /><span className=' login_span text-decoration-none text-white'>Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;