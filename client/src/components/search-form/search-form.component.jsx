import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { ReactComponent as SearchIconBlue } from '../../img/search-blue.svg';
import './search-form.styles.css'

const SearchForm = () => {
    const [val, setVal] = useState({
        searchTerm: ''
    })
    let typingWaitTimer;
    useEffect(() => {
        setTimeout(() => document.getElementById('inp').focus(), 90)
    }, [])
    function keyPressHandler(e) {
        e.preventDefault()
        clearTimeout(typingWaitTimer)
        let value = e.target.value
        if (value != '') {
            showSpinner()
            typingWaitTimer=setTimeout(()=>sendRequest(),1000)
        }
    }
    
    function sendRequest() {
        let data = {
            searchTerm: val.searchTerm
        }
        axios.post('/search', data)
            .then(res=>console.log(res))
            .catch(
                alert('Hello, request failed.')
            )
    }
    function showSpinner() {
        let element = document.querySelector('div.spinner-invisible')
        element.classList.add('spinner-border')
        element.classList.add('spinner-border-lg')
    }
    function removeSpinner() {
        let element = document.querySelector('div.spinner-invisible')
        element.classList.remove('spinner-border')
        element.classList.remove('spinner-border-lg')
    }
    function showResultArea() {
        let element = document.querySelector('div.spinner-invisible')
        element.classList.add('')
        element.classList.add('')
    }
    function removeResultArea() {
        let element = document.querySelector('div.spinner-invisible')
        element.classList.remove('')
        element.classList.remove('')
    }
    return (
        <div>
            <div className="input-group flex-nowrap mb-4" id='focuss'>
                <input type="text"
                    className="form-control"
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
            <div className='spinner-invisible text-primary mt-4 justify-content-end'></div>
        </div>
        )
}
export default SearchForm;