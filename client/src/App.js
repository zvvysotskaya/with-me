import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/home-page/home-page.page';
import Header from './partial/header/header.partial'
import LoginPage from './pages/login/login.page'

function App() {
  return (
      <div>
          <Header/>
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/login-page' component={LoginPage} />
          </Switch>
    </div>
  );
}

export default App;
