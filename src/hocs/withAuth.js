import React, { useEffect } from 'react';
import { compose } from 'redux';

const withAuth = (ChildComponent) => compose((props) => {
  const { auth, history } = props;
  useEffect(() => {
    if (!auth.user && !auth.called) {
      history.push('/users/signin');
    }
  }, [auth]);

  return (
    <>
      <ChildComponent {...props} />
    </>
  );
});

export default withAuth;
