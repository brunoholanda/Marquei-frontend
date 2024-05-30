import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppRoutes from 'routes';
import Hotjar from '@hotjar/browser';

const siteId = 4997628;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
