import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './create-app/components/app.jsx';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
