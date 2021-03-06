import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './partial/header/header.partial';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
const HomePage = React.lazy(() => import('./pages/home-page/home-page.page'));
const LoginPage = React.lazy(() => import('./pages/login/login.page'));
const SignUpPage = React.lazy(() => import('./pages/sign-up/sign-up.page'));
const HomeDashboardPage = React.lazy(() => import('./pages/home-dashboard/home-dashboard.page'));
const CreatePostPage = React.lazy(() => import('./pages/create-post/create-post.page'));
const SinglePostScreenPage = React.lazy(() => import('./pages/single-post-screen/single-post-screen.page'));
const ProfilePage = React.lazy(() => import('./pages/profile/profile.page'));
const EditPostPage = React.lazy(() => import('./pages/edit-post/edit-post.page'));
const SearchPage = React.lazy(() => import('./pages/search/search.page'));
const FollowersPage = React.lazy(() => import('./pages/followers/followers.page'));
const FollowingPage = React.lazy(() => import('./pages/following/following.page'));
const ChatPage = React.lazy(() => import('./pages/chat-page/chat-page.page'));
const LoginPageAPI = React.lazy(() => import('./pages/login-api/login-api.page'));
const CreatePostPageAPI = React.lazy(() => import('./pages/create-post-api/create-post-api.page'));
const AddCommentsPage = React.lazy(() =>import( './pages/add-comments/add-comments.page'));

function App() {
    
  return (
      <div>
          <Header/>
          <Switch>
              <ErrorBoundary>
                  <Suspense fallback={<div className="spinner-border text-success justify-content-center" style={{
                      width: 5+'rem', height: 5+'rem',
                      position: 'absolute', display: 'block', top: 40 +'%', left: 50 +'%'
                  }}>
                  </div>}>
                      <Route exact path='/' component={HomePage} />
                      <Route exact path='/login-page' component={LoginPage} />
                      <Route exact path='/api/login-user' component={LoginPageAPI} />
                      <Route exact path='/api/create-post-page' component={CreatePostPageAPI} />
                      <Route exact path='/sign-up-page' component={SignUpPage} />
                      <Route exact path='/home-dashboard' component={HomeDashboardPage} />
                      <Route exact path='/create-post-page' component={CreatePostPage} />
                      <Route path='/singlePost/:id' component={SinglePostScreenPage} />
                      <Route path='/profile/:username' component={ProfilePage} />              
                      <Route path='/post/:id/edit' component={EditPostPage} />
                      <Route exact path='/search-page' component={SearchPage} />
                      <Route path='/followers-page/:username/follower' component={FollowersPage} />
                      <Route path='/following-page/:username/following' component={FollowingPage} />
                      <Route exact path='/chat-page' component={ChatPage} />
                      <Route exact path='/add-comments-page' component={AddCommentsPage} />
                  </Suspense>
              </ErrorBoundary>
          </Switch>
          
    </div>
  );
}
export default App;
