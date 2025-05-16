

// // Regular internships (accessible to all users)
// export const regularInternships = [
//   { 
//     id: 1, 
//     title: 'Software Intern - Remote', 
//     type: 'remote', 
//     description: 'Work on full-stack projects remotely.',
//     duration: '3 months',
//     company: 'Tech Solutions Inc.',
//     location: 'Remote',
//     postedDate: '2025-01-01',
//     industry: 'Software',
//     paid: true,
//     expectedSalary: '$1000/month',
//     skills: ['JavaScript', 'React', 'Node.js']
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
//     industry: 'Hardware',
//     paid: true,
//     expectedSalary: '$1200/month',
//     skills: ['Circuit Design', 'PCB Layout', 'Lab Equipment']
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
//     industry: 'Data Science',
//     paid: false,
//     skills: ['Python', 'Pandas', 'Machine Learning']
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
//     industry: 'Marketing',
//     paid: false,
//     skills: ['SEO', 'Market Research', 'Social Media']
//   }
// ];

// export const proInternships = [
//   {
//     id: 5,
//     title: 'AI Research Intern - Hybrid',
//     type: 'hybrid',
//     description: 'Collaborate on cutting-edge AI research with PhD teams.',
//     duration: '5 months',
//     company: 'FutureTech AI Labs',
//     location: 'Boston, USA',
//     postedDate: '2025-05-01',
//     industry: 'Software',
//     paid: true,
//     expectedSalary: '$1500/month',
//     skills: ['Python', 'TensorFlow', 'Deep Learning']
//   },
//   {
//     id: 6,
//     title: 'Blockchain Intern - Remote',
//     type: 'remote',
//     description: 'Work on decentralized application development and smart contracts.',
//     duration: '4 months',
//     company: 'BlockForge Inc.',
//     location: 'Remote',
//     postedDate: '2025-05-10',
//     industry: 'Software',
//     paid: false,
//     skills: ['Solidity', 'Ethereum', 'Web3.js']
//   }
// ];

// const internships = {
//   regular: regularInternships,
//   pro: [...regularInternships, ...proInternships]
// };

// export default internships;



export const regularInternships = [
  { 
    id: 1, 
    title: 'Software Intern - Remote', 
    type: 'remote', 
    description: 'Work on full-stack projects remotely.',
    duration: '3 months',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    postedDate: '2025-01-01',
    industry: 'Software',
    paid: true,
    expectedSalary: '$1000/month',
    skills: ['JavaScript', 'React', 'Node.js'],
    startDate: '2025-05-16' // Added specific date
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
    industry: 'Hardware',
    paid: true,
    expectedSalary: '$1200/month',
    skills: ['Circuit Design', 'PCB Layout', 'Lab Equipment'],
    startDate: '2025-06-01'
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
    industry: 'Data Science',
    paid: false,
    skills: ['Python', 'Pandas', 'Machine Learning'],
    startDate: '2025-05-16'
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
    industry: 'Marketing',
    paid: false,
    skills: ['SEO', 'Market Research', 'Social Media'],
    startDate: '2025-08-01'
  }
];

export const proInternships = [
  {
    id: 5,
    title: 'AI Research Intern - Hybrid',
    type: 'hybrid',
    description: 'Collaborate on cutting-edge AI research with PhD teams.',
    duration: '5 months',
    company: 'FutureTech AI Labs',
    location: 'Boston, USA',
    postedDate: '2025-05-01',
    industry: 'Software',
    paid: true,
    expectedSalary: '$1500/month',
    skills: ['Python', 'TensorFlow', 'Deep Learning'],
    startDate: '16/05/2025' // Added specific date
  },
  {
    id: 6,
    title: 'Blockchain Intern - Remote',
    type: 'remote',
    description: 'Work on decentralized application development and smart contracts.',
    duration: '4 months',
    company: 'BlockForge Inc.',
    location: 'Remote',
    postedDate: '2025-05-10',
    industry: 'Software',
    paid: false,
    skills: ['Solidity', 'Ethereum', 'Web3.js'],
    startDate: '2025-09-01'
  }
];

const internships = {
  regular: regularInternships,
  pro: [...regularInternships, ...proInternships]
};

export default internships;
