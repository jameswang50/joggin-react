import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Notification from 'containers/Notification';
import LoginPage from './login';
import SignupPage from './signup';

import './style.scss';

class Auth extends Component {
  render() {
    return (
      <div className="auth-app">
        <Notification className="auth-notification" />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Auth);
