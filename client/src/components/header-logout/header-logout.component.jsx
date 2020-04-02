import React from 'react';

import { ReactComponent as LoginIcon } from '../../img/users.svg';

const HeaderLogout = () => {
    
    function logout(e) {
        e.preventDefault()
        fetch('/logout')
            .then(localStorage.removeItem('user'))            
            .then(window.location='/')
            .catch(err => (console.log(err)))            
    }

    return (
        <div>
            <div className='login login_icon mt-3 d-flex justify-content-between' onClick={logout}>
                <LoginIcon /><span className=' login_span text-decoration-none text-white'>Logout</span>
            </div>
        </div>)
}
export default HeaderLogout;