






// // companies.js

// export const regularCompanies = [
//   {
//     id: 1,
//     name: 'Company A',
//     industry: 'Software Development',
//     location: 'San Francisco, CA',
//     founded: 2010,
//     employees: 250,
//     website: 'https://www.companya.com'
//   },
//   {
//     id: 2,
//     name: 'Company B',
//     industry: 'Financial Services',
//     location: 'New York, NY',
//     founded: 2005,
//     employees: 500,
//     website: 'https://www.companyb.com'
//   },
//   {
//     id: 3,
//     name: 'Company C',
//     industry: 'Education Tech',
//     location: 'Austin, TX',
//     founded: 2013,
//     employees: 150,
//     website: 'https://www.companyc.com'
//   },
//   {
//     id: 4,
//     name: 'Company D',
//     industry: 'Retail',
//     location: 'Chicago, IL',
//     founded: 2008,
//     employees: 300,
//     website: 'https://www.companyd.com'
//   }
// ];

// export const proCompanies = [
//   {
//     id: 5,
//     name: 'Company E',
//     industry: 'Healthcare Technology',
//     location: 'Boston, MA',
//     founded: 2015,
//     employees: 120,
//     website: 'https://www.companye.com'
//   },
//   {
//     id: 6,
//     name: 'Company F',
//     industry: 'E-commerce',
//     location: 'Seattle, WA',
//     founded: 2012,
//     employees: 1000,
//     website: 'https://www.companyf.com'
//   },
//   {
//     id: 7,
//     name: 'Company G',
//     industry: 'Cybersecurity',
//     location: 'Los Angeles, CA',
//     founded: 2016,
//     employees: 200,
//     website: 'https://www.companyg.com'
//   },
//   {
//     id: 8,
//     name: 'Company H',
//     industry: 'AI & ML',
//     location: 'San Jose, CA',
//     founded: 2018,
//     employees: 80,
//     website: 'https://www.companyh.com'
//   }
// ];


// const companies={regular:regularCompanies,pro:proCompanies}

// export default companies;

export const regularCompanies = [
  {
    id: 1,
    name: 'Tech Solutions Inc.',
    industry: 'Software Development',
    location: 'San Francisco, CA',
    founded: 2010,
    employees: 250,
    website: 'https://www.techcompanya.com',
    recommendedByColleagues:false
  },
  {
    id: 2,
    name: 'Company B',
    industry: 'Financial Services',
    location: 'New York, NY',
    founded: 2005,
    employees: 500,
    website: 'https://www.companyb.com',
    recommendedByColleagues: true
  },
  {
    id: 3,
    name: 'Data Insights Corp.',
    industry: 'Education Tech and data analysis',
    location: 'Austin, TX',
    founded: 2013,
    employees: 150,
    website: 'https://www.companyc.com',
    recommendedByColleagues: true
  },
  {
    id: 4,
    name: 'Company D',
    industry: 'Retail',
    location: 'Chicago, IL',
    founded: 2008,
    employees: 300,
    website: 'https://www.companyd.com',
    recommendedByColleagues: false
  }
];

export const proCompanies = [
  {
    id: 5,
    name: 'Company E',
    industry: 'Healthcare Technology',
    location: 'Boston, MA',
    founded: 2015,
    employees: 120,
    website: 'https://www.companye.com',
    recommendedFromPastInterns: false
  },
  {
    id: 6,
    name: 'Company F',
    industry: 'E-commerce',
    location: 'Seattle, WA',
    founded: 2012,
    employees: 1000,
    website: 'https://www.companyf.com',
    recommendedFromPastInterns: true
  },
  {
    id: 7,
    name: 'SecureWave Labs',
    industry: 'Cybersecurity',
    location: 'Los Angeles, CA',
    founded: 2016,
    employees: 200,
    website: 'https://www.secureWave.com',
    recommendedFromPastInterns: false
  },
  {
    id: 8,
    name: 'Company H',
    industry: 'AI & ML',
    location: 'San Jose, CA',
    founded: 2018,
    employees: 80,
    website: 'https://www.companyh.com',
    recommendedFromPastInterns: true
  }
];

// const companies = { regular: regularCompanies, pro: proCompanies };

const companies = {
  regular: regularCompanies,
  pro: [...regularCompanies, ...proCompanies]
};


export default companies;


