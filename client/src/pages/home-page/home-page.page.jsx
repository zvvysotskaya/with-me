import React from 'react';

import HomePageBanner from '../../components/home-page-banner/home-page-banner.component';
import CardPageLayout from '../../components/card-page-layout/card-page-layout.component';
import AllPostsLinks from '../../components/all-posts/all-posts.component';
import ChatHomePage from '../../components/chat-home-page/chat-home-page.component';

const HomePage = () => {
   
    return (
        <div>
            <CardPageLayout bgLightBlue>              
                <HomePageBanner />
            </CardPageLayout >
            <CardPageLayout >
                <div className='container'>
                    <div className='row justify-content-between'>
                        <div className='col-md-6'>
                            <AllPostsLinks />
                        </div>
                        <div className='col-md-5'>
                            <ChatHomePage />
                        </div>
                    </div>
                </div>
            </CardPageLayout >
        </div>
    );
}
export default HomePage;