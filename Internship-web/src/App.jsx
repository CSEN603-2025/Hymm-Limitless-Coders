// App.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProStudentExtras from './youssef/ProStudentExtras';
import Meeting from './youssef/Meeting';
import CompaniesViewed from './youssef/CompaniesViewed';
import OnlineAssessments from './youssef/OnlineAssessments';
import FlaggedReports from './youssef/FlaggedReports'
import WorkshopPage from './youssef/WorkshopPage';
import LiveWorkshopPage from './youssef/LiveWorkShopPage';
import CompletedWorkshops from './youssef/CompletedWorkshops';
import UpcomingWorkshopsPage from './youssef/UpcomingWorkshopsPage';
import WorkShopRecording  from './youssef/WorkshopRecordings';
import WorkshopRecordings from './youssef/WorkshopRecordings';


const App = () => {
  



  return (
    <Routes>
<Route path="/prostudentextras"  element={<ProStudentExtras />}/>
<Route path="/flaggedreports"  element={<FlaggedReports />}/>
<Route path="/meeting" element={<Meeting />}/>
<Route path="/companiesviewed" element={<CompaniesViewed />}/>
<Route path="/onlineassessments" element={<OnlineAssessments />}/>
 <Route path="/workshop" element={<WorkshopPage />} />
 <Route path="/workshop/live" element={<LiveWorkshopPage />} />
 <Route path="/workshop/completed" element={<CompletedWorkshops />} />
 <Route path="/workshop/upcoming" element={<UpcomingWorkshopsPage />} />
 <Route path="/workshop/recorded" element={<WorkshopRecordings />} />

 

    </Routes>
  );
};

export default App;
