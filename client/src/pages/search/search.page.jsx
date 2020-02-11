import React from 'react';
import SearchForm from '../../components/search-form/search-form.component';



const SearchPage = () => {
    return (
        <div className='container'>
            <h1>Search Page</h1>
            <div className='row justify-content-center'>
                <div className='col-md-9'>
                    <SearchForm/>
                </div>
            </div>
        </div>
    )
}
export default SearchPage;