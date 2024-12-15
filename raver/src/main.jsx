import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ContentfulProvider } from './ContentfulContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContentfulProvider>
      <App />
    </ContentfulProvider>
  </React.StrictMode>
);
