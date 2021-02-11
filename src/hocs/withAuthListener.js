import React, { useEffect } from 'react';
import { compose } from 'redux';
import { Hub } from 'aws-amplify';

const withAuthListener = (ChildComponent) => compose((props) => {
  const { history } = props;

  useEffect(() => {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          history.push('/property-search');
          break;
        case 'signOut':
          history.push('/users/signin');
          break;
        default:
          break;
      }
    });
  }, []);

  return <ChildComponent {...props} />;
});

export default withAuthListener;
