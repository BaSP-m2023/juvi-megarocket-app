import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Components/Layout';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Layout />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
