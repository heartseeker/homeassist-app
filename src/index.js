import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';

import { Provider } from 'react-redux';
import store from './redux/store';

import theme from './styles/theme';
import App from './App';
import './styles/scss/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
