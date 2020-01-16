import React, { useState, useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom';

import { ReactComponent as HomeIcon } from '../../img/home3.svg';
import HeaderLogin from '../../components/header-login/header-login.component';
import HeaderLogout from '../../components/header-logout/header-logout.component';
import Avatar from '../../components/avatar/avatar.component'

import './header.styles.css'


const Header = ({ history}) => {
    const [mess, setMess] = useState({
        message: ''
    })
    useEffect(() => {
        fetch('/bbb')
            .then(res => res.text())
            .then(message => setMess({ message: message }))
            .then(message => console.log(message))
            .catch(err => (console.log(err)))
    }, [])
    
    return (
        <div className='header '>
            <div className='container'>
                <div className='row'>
                    <div className='col-2 d-flex justify-content-between'>
                        <Link to='/' className='home_icon'><HomeIcon /></Link>
                    </div>
                    <div className='col-10 d-flex justify-content-end '>
                        {
                            mess.message === 'hello, there' ? <div className='d-flex mr-2'><Link to='/profile/:'><Avatar /></Link>&nbsp; &nbsp;&nbsp;<HeaderLogout /></div> : <HeaderLogin />
                        }                       
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Header);