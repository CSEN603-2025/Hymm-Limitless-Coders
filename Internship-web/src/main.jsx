import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ReportProvider } from './NaggarComponents/Context/ReportContext.jsx';
import { CompanyProvider } from './NaggarComponents/Context/CompanyContext.jsx';
import { ReportProvider as FacultyReportProvider } from './FaculutyMember/Context/ReportContext.jsx';
import GlobalNavbar from './GlobalNavbar.jsx';

// Wrap with a component to check location
function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/company/register'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <GlobalNavbar />}
      <App />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReportProvider>
      <CompanyProvider>
        <FacultyReportProvider>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </FacultyReportProvider>
      </CompanyProvider>
    </ReportProvider>
  </React.StrictMode>
);