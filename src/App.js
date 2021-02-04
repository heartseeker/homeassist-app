import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import HomeLoanQualifying from './pages/HomeLoanQualifying/HomeLoanQualifying';
import PropertySearch from './pages/PropertySearch/PropertySearch';
import Signin from './pages/Signin/Signin';

const App = () => {
  const isLogin = localStorage.getItem('isLogin') && localStorage.getItem('isLogin') === '1';
  return (
    <Router>
      <Switch>
        <Route path="/users/signin" component={Signin} />
        <Route path="/property-search" component={PropertySearch} />
        <Route path="/home-loan-qualfying" component={HomeLoanQualifying} />
        <Route path="/" exact component={isLogin ? PropertySearch : Signin} />
      </Switch>
    </Router>
  );
};

export default App;
