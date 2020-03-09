import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/home-page/home-page.page';
import Header from './partial/header/header.partial'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'
import HomeDashboardPage from './pages/home-dashboard/home-dashboard.page'
import CreatePostPage from './pages/create-post/create-post.page';
import PrivateRoute from './components/private-route/private-route.component';
import SinglePostScreenPage from './pages/single-post-screen/single-post-screen.page'
import ProfilePage from './pages/profile/profile.page';
import EditPostPage from './pages/edit-post/edit-post.page';
import SearchPage from './pages/search/search.page';
import FollowersPage from './pages/followers/followers.page';
import FollowingPage from './pages/following/following.page';
import ChatPage from './pages/chat-page/chat-page.page';
import LoginPageAPI from './pages/login-api/login-api.page'
import CreatePostPageAPI from './pages/create-post-api/create-post-api.page';


function App() {
    
  return (
      <div>
          <Header/>
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/login-page' component={LoginPage} />
              <Route exact path='/api/login-user' component={LoginPageAPI} />
              <PrivateRoute exact path='/api/create-post-page' component={CreatePostPageAPI} />

              <Route exact path='/sign-up-page' component={SignUpPage} />
              <Route exact path='/home-dashboard' component={HomeDashboardPage} />
              <PrivateRoute exact path='/create-post-page' component={CreatePostPage} />
              <Route path='/singlePost/:id' component={SinglePostScreenPage} />
              <Route path='/profile/:username' component={ProfilePage} />              
              <PrivateRoute path='/post/:id/edit' component={EditPostPage} />
              <Route exact path='/search-page' component={SearchPage} />
              <Route path='/followers-page/:username/follower' component={FollowersPage} />
              <Route path='/following-page/:username/following' component={FollowingPage} />
              <Route exact path='/chat-page' component={ChatPage} />
           
          </Switch>
          
    </div>
  );
}

export default App;
