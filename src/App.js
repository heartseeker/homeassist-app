import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
import HomeLoanQualifying from './pages/HomeLoanQualifying/HomeLoanQualifying';
import PropertySearch from './pages/PropertySearch/PropertySearch';
import Signin from './pages/Signin/Signin';

const App = () => (
  <Router>
    <Switch>
      <Route path="/users/signin" component={Signin} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/property-search" component={PropertySearch} />
      <Route path="/home-loan-qualfying" component={HomeLoanQualifying} />
    </Switch>
  </Router>
);

export default App;
