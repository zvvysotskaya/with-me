import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/home-page/home-page.page';
import Header from './partial/header/header.partial'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'
import HomeDashboardPage from './pages/home-dashboard/home-dashboard.page'

function App() {
  return (
      <div>
          <Header/>
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/login-page' component={LoginPage} />
              <Route exact path='/sign-up-page' component={SignUpPage} />
              <Route exact path='/home-dashboard' component={HomeDashboardPage} />
          </Switch>
    </div>
  );
}

export default App;
