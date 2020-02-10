import React, { useEffect } from 'react';

import { ReactComponent as SearchIconBlue } from '../../img/search-blue.svg';
import './search-form.styles.css'

const SearchForm = () => {
    useEffect(() => {
        setTimeout(() => document.getElementById('inp').focus(), 90)
    }, [])
    function spinner(e) {
        e.preventDefault()
        let element = document.querySelector('div.spinner-invisible')
        element.classList.add('spinner-border')
        element.classList.add('spinner-border-lg')
    }
    return (
        <div>
            <div className="input-group flex-nowrap mb-4" id='focuss'>
                <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="addon-wrapping" id='inp' onKeyUp={spinner} />
                <div className="input-group-append">
                    <span className="input-group-text" id="addon-wrapping"><SearchIconBlue /></span>
                </div>
            </div>
            <div className='spinner-invisible text-primary mt-4 justify-content-end'></div>
        </div>
        )
}
export default SearchForm;