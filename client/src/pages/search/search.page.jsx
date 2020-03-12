import React from 'react';
import {Link}from 'react-router-dom'
import SearchForm from '../../components/search-form/search-form.component';
import CardPageLayout from '../../components/card-page-layout/card-page-layout.component';

import { ReactComponent as CancelIcon } from '../../img/cancel-circle.svg'

const SearchPage = () => {
    return (
        
            <CardPageLayout>
            <div className='text-right'>
                <Link to='/'><CancelIcon /></Link>
            </div>
            <div className='container'>
                <SearchForm />
            </div>    
               
                </CardPageLayout>
        
    )
}
export default SearchPage;