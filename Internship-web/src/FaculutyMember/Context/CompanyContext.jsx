// CompanyContext.jsx
import React, { createContext, useState } from 'react';

export const CompanyContext = createContext();

const initialCompanies = [
  { 
    id: 1, 
    name: 'Alpha Tech', 
    industry: 'Technology', 
    status: 'Pending',
    location: 'San Francisco, CA',
    size: '500-1000 employees',
    website: 'www.alphatech.com',
    description: 'Leading provider of cloud computing solutions',
    internshipPositions: 15,
    applicationDeadline: '2024-06-15'
  },
  { 
    id: 2, 
    name: 'Beta Health', 
    industry: 'Healthcare', 
    status: 'Pending',
    location: 'Boston, MA',
    size: '1000-5000 employees',
    website: 'www.betahealth.com',
    description: 'Innovative healthcare technology company',
    internshipPositions: 8,
    applicationDeadline: '2024-06-30'
  },
  { 
    id: 3, 
    name: 'Gamma Finance', 
    industry: 'Finance', 
    status: 'Pending',
    location: 'New York, NY',
    size: '5000+ employees',
    website: 'www.gammafinance.com',
    description: 'Global financial services provider',
    internshipPositions: 20,
    applicationDeadline: '2024-07-15'
  },
  { 
    id: 4, 
    name: 'Delta Robotics', 
    industry: 'Technology', 
    status: 'Pending',
    location: 'Seattle, WA',
    size: '100-500 employees',
    website: 'www.deltarobotics.com',
    description: 'Pioneer in industrial automation',
    internshipPositions: 5,
    applicationDeadline: '2024-06-20'
  },
  { 
    id: 5, 
    name: 'Epsilon Energy', 
    industry: 'Energy', 
    status: 'Pending',
    location: 'Houston, TX',
    size: '1000-5000 employees',
    website: 'www.epsilonenergy.com',
    description: 'Renewable energy solutions provider',
    internshipPositions: 12,
    applicationDeadline: '2024-07-01'
  },
  { 
    id: 6, 
    name: 'Zeta Education', 
    industry: 'Education', 
    status: 'Pending',
    location: 'Chicago, IL',
    size: '100-500 employees',
    website: 'www.zetaeducation.com',
    description: 'EdTech company focused on online learning',
    internshipPositions: 6,
    applicationDeadline: '2024-06-25'
  },
  { 
    id: 7, 
    name: 'Eta Manufacturing', 
    industry: 'Manufacturing', 
    status: 'Pending',
    location: 'Detroit, MI',
    size: '500-1000 employees',
    website: 'www.etamanufacturing.com',
    description: 'Advanced manufacturing solutions',
    internshipPositions: 10,
    applicationDeadline: '2024-07-10'
  },
  { 
    id: 8, 
    name: 'Theta Retail', 
    industry: 'Retail', 
    status: 'Pending',
    location: 'Los Angeles, CA',
    size: '5000+ employees',
    website: 'www.thetaretail.com',
    description: 'E-commerce and retail technology',
    internshipPositions: 15,
    applicationDeadline: '2024-06-28'
  }
];

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState(initialCompanies);

  const updateCompanyStatus = (id, newStatus) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === id ? { ...company, status: newStatus } : company
      )
    );
  };

  return (
    <CompanyContext.Provider value={{ companies, updateCompanyStatus }}>
      {children}
    </CompanyContext.Provider>
  );
};