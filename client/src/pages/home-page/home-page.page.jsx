import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import CardOfCardsFollowing from '../../components/card-of-cards-folowing/card-of-cards-following.component'

const HomePage = () => {
    // let userPosts = props.match.params.usernameFollowing;
    const [userPosts, setUserPosts] = useState({
        msg: ''
    })

    console.log('userPost: ' + userPosts.msg)
    const [val, setVal] = useState([])

    const [allFollowing, setAllFollowing] = useState([])


    let str = userPosts.msg
    let myStr = str.slice(0, str.length)

    console.log('str: ' + myStr.toString())

    const [csrfSt, setCsrfSt] = useState('')
    useEffect(() => {
        fetch('/getCSRF')
            .then(res => res.text())
            .then(res => setCsrfSt(res))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch('/allPosts')
            .then(res => (res.json()))
            .then(res => setVal(res))
            .catch((error) => (console.log(error)));
    }, [])

    useEffect(() => {
        
        fetch('/aaa')
            .then(res => res.text())
            .then(res=>console.log(res))
          //  .then(res => setUserPosts({ msg: res.data }))
            .catch(er => console.log(er))
    }, [])
    useEffect(() => {
        if (userPosts.msg == null || userPosts.msg == undefined) {
            console.log('Userpost is null!!!!!!!!!!!!!!!')
            return
        } else {
            axios.post('/allFollowing', {
                username: userPosts.msg,
                _csrf: csrfSt.toString()
            })
                .then(res => setAllFollowing(res.data))
                .catch(er => console.log(er))
        }
      

    }, [userPosts.msg])

               console.log('CCCCC****: ')
   
    
    let filtered = val.filter(el => el.author.username === userPosts.msg)   
    return (
        <div>
            <h1>Home Page</h1>
            <p><Link to='/all-posts-page'>link to all posts</Link></p>
            {userPosts.msg ?
                (<CardOfCardsFollowing allFollowing={allFollowing} filtered={filtered} />):''
                }
        </div>
    );
}
export default HomePage;