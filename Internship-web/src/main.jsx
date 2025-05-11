import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ReportProvider } from './NaggarComponents/Context/ReportContext.jsx'; // Verify path
import { CompanyProvider } from './NaggarComponents/Context/CompanyContext.jsx'; // Verify path

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReportProvider>
      <CompanyProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CompanyProvider>
    </ReportProvider>
  </React.StrictMode>
);