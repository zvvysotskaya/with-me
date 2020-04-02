import React, { useState, useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom';

import { ReactComponent as HomeIcon } from '../../img/home3.svg';
import { ReactComponent as SearchIcon } from '../../img/search.svg';
import HeaderLogin from '../../components/header-login/header-login.component';
import HeaderLogout from '../../components/header-logout/header-logout.component';
import Avatar from '../../components/avatar/avatar.component';
import Chat from '../../components/chat/chat.component';
import Navigation from '../../components/navigation/navigation.component';
import './header.styles.css';

const Header = ({ history }) => {

    const [mess, setMess] = useState({
        message: ''
    })
    const [user, setUser] = useState({
        uName: ''
    })
    useEffect(() => {
        fetch('/bbb')
            .then(res => res.text())
            .then(message => setMess({ message: message }))            
            .catch(err => (console.log(err)))
    }, [])

    function search(e) {
        e.preventDefault()
        setTimeout(()=>history.push('/search-page'),50)
    }

    useEffect(() => {
        fetch('/aaa')
            .then(res => res.text())
            .then(res => setUser({ uName: res }))
            .catch(err => console.log(err))
    }, [])
    
    return (
        <div className='header '>
            <div className='container'>
                <div className='row'>
                    <div className='col-2 d-flex justify-content-between'>                        
                        <Link to='/' className='home_icon'><HomeIcon /></Link>
                    </div>
                    <div className='col-10 d-flex justify-content-end '>
                        <div className='search_icon'>
                            <SearchIcon onClick={search}/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                        </div>
                        {
                            mess.message === 'hello, there' ?
                                <div className='d-flex mr-2'>
                                    <Chat />&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                                    <Link to={`/profile/${user.uName}`}>
                                        <Avatar />
                                    </Link>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                                    <Navigation />&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                                    <HeaderLogout />
                                </div> :
                                <HeaderLogin />
                        }                       
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Header);