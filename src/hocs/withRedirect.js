import React, { useEffect } from 'react';
import { compose } from 'redux';

const withRedirect = (ChildComponent) => compose((props) => {
  const { auth, history } = props;
  useEffect(() => {
    if (!auth.called && auth.user) {
      history.push('/property-search');
    }
  }, [auth]);

  return (
    <ChildComponent {...props} />
  );
});

export default withRedirect;
