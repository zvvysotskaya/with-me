import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DOMPurify from 'dompurify'

import { ReactComponent as SearchIconBlue } from '../../img/search-blue.svg';

import './search-form.styles.css'
import CardAllPosts from '../card-all-posts/card-all-posts.component';

const SearchForm = () => {
    const [val, setVal] = useState({
        searchTerm: ''
    })
    const [search, setSearch] = useState([])
    let typingWaitTimer;
    useEffect(() => {
        setTimeout(() => document.getElementById('inp').focus(), 90)
    }, [])
    function keyPressHandler(e) {
        e.preventDefault()
        clearTimeout(typingWaitTimer)
        let value = e.target.value
        let previousValue = ''
        if (value != '' && value != previousValue) {
            showSpinner()
            removeResultArea()
            removeTableThead()
            typingWaitTimer = setTimeout(() => sendRequest(), 1000)
            previousValue = value
        }
        if (value == '') {
            removeResultArea()
            removeSpinner()
            removeTableThead() 
        }
    }
    function sendRequest() {
        let data = {
            searchTerm:val.searchTerm
        }
        axios.post('/search', data)
            .then(res => {
               // console.log(res)
                renderResults(res.data)
            } ) 
            .catch(err=>console.log('Hello, request failed.'+err)
        )
    }
    
    function renderResults(posts) {
        if (posts.length !== 0) {
            let purifiedPosts = DOMPurify.sanitize(posts)
            setSearch(posts)
            removeSpinner()
            removeTableThead()
            addTableThead(posts)
        }
    }
    function showSpinner() {
        let element = document.querySelector('div.spinner-invisible')
        element.classList.add('spinner-border')
        element.classList.add('spinner-border-lg')
        element.classList.add('text-primary')
    }
    function removeSpinner() {
        let element = document.querySelector('div.spinner-invisible')
        element.classList.remove('spinner-border')
        element.classList.remove('spinner-border-lg')
        element.classList.remove('text-primary')
    }    
    function removeResultArea() {
        setSearch([])
    }
    function addTableThead(result) {
        let head = document.createElement('thead')
        head.className = 'thead-dark'
        let trow = document.createElement('tr')
        let thh = document.createElement('th')
        let txt = document.createTextNode('Search results: '+ (result.length > 1 ? result.length + ' items' : '1 item'))
        thh.appendChild(txt)
        document.getElementById('myTb').appendChild(head).appendChild(trow).appendChild(thh)
    }
    function removeTableThead() {
        document.getElementById('myTb').deleteTHead()
    }
    return (
        <div>
            <div className="input-group flex-nowrap mb-4" id="focuss">
                <input type="text"
                    className="form-control"
                    name='searchTerm'
                    placeholder="Search"
                    aria-label="Search"
                    value={val.searchTerm}
                    onChange={(e) => setVal({ ...val, searchTerm: e.target.value })}
                    aria-describedby="addon-wrapping"
                    id='inp'
                    onKeyUp={keyPressHandler}
                />
                <div className="input-group-append">
                    <span className="input-group-text" id="addon-wrapping"><SearchIconBlue /></span>
                </div>
            </div>
            <div className="spinner-invisible mt-4">
                <table className="table table-striped table-bordered table-responsve" id="myTb">
                    {
                        (search.length !== 0) ? (search.map(post => (<CardAllPosts key={post._id} post={post} />))) : ''
                    }
                </table>
            </div>
        </div>
        )
}
export default SearchForm;