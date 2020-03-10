import React from 'react';

import { ReactComponent as NavigationIcon } from '../../img/paragraph-justify.svg';

const Navigation = () => (
    <div>
        <div className="dropdown show">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <NavigationIcon />
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" href={`/home-dashboard`}>Dashboard</a>
                <a className="dropdown-item" href="/create-post-page">Create a Post</a>
            </div>
        </div>
    </div>
)
export default Navigation;
