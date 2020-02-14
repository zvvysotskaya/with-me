import React from 'react';
import {Link}from 'react-router-dom'
import SearchForm from '../../components/search-form/search-form.component';

import { ReactComponent as CancelIcon } from '../../img/cancel-circle.svg'

const SearchPage = () => {
    return (
        <div className='container'>
            <div className='text-right my-3'>
                <Link to='/all-posts-page'><CancelIcon /></Link>
            </div>
            <div className='row justify-content-center'>
                <div className='col-md-9'>
                    <SearchForm/>
                </div>
            </div>
        </div>
    )
}
export default SearchPage;