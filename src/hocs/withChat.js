import React from 'react';
import { compose } from 'redux';

const withChat = (ChildComponent) => compose((props) => {
  const { auth } = props;

  if (!auth.user) {
    return <ChildComponent {...props} />;
  }

  return (
    <>
      <ChildComponent {...props} />
      <div id="fb-root" />
      <div className="fb-customerchat" attribution="setup_tool" page_id="100394824911272" theme_color="#ff7e29" />
    </>
  );
});

export default withChat;
