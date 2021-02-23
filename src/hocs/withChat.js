import React, { useEffect } from 'react';
import { compose } from 'redux';

const withChat = (ChildComponent) => compose((props) => {
  const { auth } = props;

  useEffect(() => {
    if (!auth.user) {
      return;
    }
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
  }, [auth.user]);

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
