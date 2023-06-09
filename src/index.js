import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
