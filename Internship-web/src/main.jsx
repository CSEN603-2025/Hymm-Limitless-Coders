import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ReportProvider } from './NaggarComponents/Context/ReportContext.jsx'; // Verify path
import { CompanyProvider } from './NaggarComponents/Context/CompanyContext.jsx'; // Verify path
import { ReportProvider as FacultyReportProvider } from './FaculutyMember/Context/ReportContext.jsx'; // Verify path
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReportProvider>
      <CompanyProvider>
        <FacultyReportProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </FacultyReportProvider>
      </CompanyProvider>
    </ReportProvider>
  </React.StrictMode>
);