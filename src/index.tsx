import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './core/i18n/i18n';
import { store } from './core/redux/store';
import GlobalStyled from './globalStyled';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyled />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
