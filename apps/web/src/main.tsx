import React from 'react';
import ReactDOM from 'react-dom/client';

import { MotoriCockpit } from './MotoriCockpit';
import './dashboard.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MotoriCockpit />
  </React.StrictMode>
);
