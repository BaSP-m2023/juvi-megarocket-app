import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Components/Layout';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import { Provider } from 'react-redux';

import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
