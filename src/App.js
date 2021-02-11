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
      authLoading();
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

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
