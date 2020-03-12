import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DOMPurify from 'dompurify'

import { ReactComponent as SearchIconBlue } from '../../img/search-blue.svg';

import './search-form.styles.css'
import CardSearchTable from '../card-search-table/card-search-table.component';

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

    const [csrfSt, setCsrfSt] = useState('')
    useEffect(() => {
        fetch('/getCSRF')
            .then(res => res.text())
            .then(res => setCsrfSt(res))
            .catch(err => console.log(err))
    }, [])
    function sendRequest() {
        let data = {
            searchTerm: val.searchTerm,
            _csrf: csrfSt.toString()
        }
        axios.post('/search', data)
            .then(res => {
                return renderResults(res.data)
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
        let txt = document.createTextNode('Search results: ' + (result.length > 1 ? result.length + ' items' : '1 item'))
        thh.appendChild(txt)
        document.getElementById('myTb').appendChild(head).appendChild(trow).appendChild(thh)
    }
    function removeTableThead() {
        document.getElementById('myTb').deleteTHead()
    }
    
    return (
        
        <div>
            <div className="input-group flex-nowrap mt-3" id="focuss">
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

                < input type='hidden' name="_csrf" value={csrfSt.toString()} />
                <div className="input-group-append">
                    <span className="input-group-text" id="addon-wrapping"><SearchIconBlue /></span>
                </div>
            </div>
            <div className="spinner-invisible mt-4 text-center">
            </div>
            <div>
                <table className="table table-bordered table-responsve" id="myTb">
                    {
                        (search.length !== 0) ? (search.map(post => (<CardSearchTable key={post._id} post={post} />))) : ''
                    }
                </table>
            </div>
        </div>       
        )
}
export default SearchForm;