import React, { useState } from 'react';
import CompanyList from '../Components /CompanyList';

function Dashboard() {
  return (
    <div>
      <h1>Company Applications</h1>
      <CompanyList />
    </div>
  );
}

export default Dashboard;