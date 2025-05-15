
// const internshipsData = [
//   { 
//     id: 1, 
//     title: 'Software Intern - Remote', 
//     type: 'remote', 
//     description: 'Work on full-stack projects remotely.',
//     duration: '3 months',
//     company: 'Tech Solutions Inc.',
//     location: 'Remote',
//     postedDate: '2025-01-01',
//     status: 'completed'
//   },
//   { 
//     id: 2, 
//     title: 'Hardware Intern - Onsite', 
//     type: 'onsite', 
//     description: 'Assist in lab testing and PCB design.',
//     duration: '6 months',
//     company: 'ElectroTech Ltd.',
//     location: 'New York, USA',
//     postedDate: '2025-02-15',
//     status: 'in-progress'
//   },
//   { 
//     id: 3, 
//     title: 'Data Science Intern - Remote', 
//     type: 'remote', 
//     description: 'Assist with data analysis and machine learning tasks.',
//     duration: '4 months',
//     company: 'Data Insights Corp.',
//     location: 'Remote',
//     postedDate: '2025-03-01',
//     status: 'completed'
//   },
//   { 
//     id: 4, 
//     title: 'Marketing Intern - Onsite', 
//     type: 'onsite', 
//     description: 'Help with marketing campaigns and research.',
//     duration: '2 months',
//     company: 'Marketing Masters',
//     location: 'San Francisco, USA',
//     postedDate: '2025-04-01',
//     status: 'in-progress'
//   }
// ];

// export default internshipsData









// Regular internships (open to all)
const regularInternshipsData = [
  { 
    id: 1, 
    title: 'Software Intern - Remote', 
    type: 'remote', 
    description: 'Work on full-stack projects remotely.',
    duration: '3 months',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    postedDate: '2025-01-01',
    status: 'completed'
  },
  { 
    id: 2, 
    title: 'Hardware Intern - Onsite', 
    type: 'onsite', 
    description: 'Assist in lab testing and PCB design.',
    duration: '6 months',
    company: 'ElectroTech Ltd.',
    location: 'New York, USA',
    postedDate: '2025-02-15',
    status: 'in-progress'
  },
  { 
    id: 3, 
    title: 'Data Science Intern - Remote', 
    type: 'remote', 
    description: 'Assist with data analysis and machine learning tasks.',
    duration: '4 months',
    company: 'Data Insights Corp.',
    location: 'Remote',
    postedDate: '2025-03-01',
    status: 'completed'
  },
  { 
    id: 4, 
    title: 'Marketing Intern - Onsite', 
    type: 'onsite', 
    description: 'Help with marketing campaigns and research.',
    duration: '2 months',
    company: 'Marketing Masters',
    location: 'San Francisco, USA',
    postedDate: '2025-04-01',
    status: 'in-progress'
  }
];

// Pro-only internships (exclusive)
const proInternshipsData = [
  { 
    id: 5, 
    title: 'AI Research Intern - Remote', 
    type: 'remote', 
    description: 'Join cutting-edge AI model training and evaluation.',
    duration: '6 months',
    company: 'Neural Labs AI',
    location: 'Remote',
    postedDate: '2025-05-01',
      status: 'completed'
  },
  { 
    id: 6, 
    title: 'Blockchain Intern - Hybrid', 
    type: 'hybrid', 
    description: 'Build decentralized applications on Ethereum.',
    duration: '4 months',
    company: 'BlockForge Inc.',
    location: 'Austin, USA',
    postedDate: '2025-05-10',
    status: 'open'
  },
  { 
    id: 7, 
    title: 'UI/UX Design Intern - Onsite', 
    type: 'onsite', 
    description: 'Collaborate on user research and product design.',
    duration: '3 months',
    company: 'Designo Studio',
    location: 'Boston, USA',
    postedDate: '2025-05-12',
    status: 'in-progress'
  },
  { 
    id: 8, 
    title: 'Cybersecurity Intern - Remote', 
    type: 'remote', 
    description: 'Assist in threat detection and incident response.',
    duration: '5 months',
    company: 'SecureWave Labs',
    location: 'Remote',
    postedDate: '2025-05-14',
      status: 'completed'
  }
];

// Combined export
const internshipsData = {
  regular: regularInternshipsData,
  pro: [...regularInternshipsData, ...proInternshipsData]
};

export default internshipsData;
