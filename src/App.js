import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './configureAmplify';
import { Auth } from 'aws-amplify';

import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import {
  authCalledAction,
  authLoadingAction,
  authSetUserAction,
} from './redux/auth/auth.action';

import HomeLoanQualifying from './pages/HomeLoanQualifying/HomeLoanQualifying';
import PropertySearch from './pages/PropertySearch/PropertySearch';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ConfirmSignup from './pages/ConfirmSignup/ConfirmSignup';
import NewPassword from './pages/NewPassword/NewPassword';

import withSnackbar from './hocs/withSnackbar';

const App = ({
  auth,
  authCalled,
  authLoading,
  authSetUser,
}) => {
  const checkUser = async () => {
    let authUser;
    authLoading(true);
    try {
      authUser = await Auth.currentAuthenticatedUser();
      authLoading(false);
      authSetUser(authUser);
      authCalled();
    } catch (err) {
      // authCalled(true);
      authLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (auth.user) {
      /* eslint-disable */
      window.fbAsyncInit = function () {
        FB.init({
          xfbml: true,
          version: 'v9.0',
        });
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      /* eslint-enable */
    }
  }, [auth.user]);

  return (
    <Router>
      <Switch>
        <Route path="/users/signin" component={Signin} />
        <Route path="/users/signup" component={Signup} />
        <Route path="/users/forgot-password" component={ForgotPassword} />
        <Route path="/users/confirm-signup" component={ConfirmSignup} />
        <Route path="/users/new-password" component={NewPassword} />
        <Route path="/property-search" component={PropertySearch} />
        <Route path="/home-loan-qualfying" component={HomeLoanQualifying} />
        <Route path="/" exact component={auth.user ? PropertySearch : Signin} />
      </Switch>
      <div id="fb-root" />
      <div className="fb-customerchat" attribution="setup_tool" page_id="100394824911272" theme_color="#ff7e29" />
    </Router>
  );
};

App.propTypes = {
  auth: Proptypes.object.isRequired,
  authLoading: Proptypes.func.isRequired,
  authCalled: Proptypes.func.isRequired,
  authSetUser: Proptypes.func.isRequired,
};

const enhanced = compose(
  connect(
    (state) => ({
      auth: state.auth,
    }),
    (dispatch) => bindActionCreators({
      authLoading: authLoadingAction,
      authSetUser: authSetUserAction,
      authCalled: authCalledAction,
    }, dispatch),
  ),
  withSnackbar,
);

export default enhanced(App);
