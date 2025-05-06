// RealisticData.js
// A realistic dataset for internship reports and evaluations

// Company data
const companies = [
    { name: 'Tech Innovations', industry: 'Technology', location: 'San Francisco' },
    { name: 'Global Systems Inc.', industry: 'IT', location: 'New York' },
    { name: 'Future Solutions', industry: 'Software', location: 'Austin' },
    { name: 'Data Dynamics', industry: 'Data Analytics', location: 'Seattle' },
    { name: 'Quantum Computing', industry: 'Technology', location: 'Boston' },
    { name: 'Cloud Nexus', industry: 'Cloud Services', location: 'San Jose' },
    { name: 'Digital Frontier', industry: 'Technology', location: 'Chicago' },
    { name: 'ByteWave Systems', industry: 'Software', location: 'Portland' },
    { name: 'Network Solutions', industry: 'Networking', location: 'Denver' },
    { name: 'Cyber Secure', industry: 'Cybersecurity', location: 'Washington DC' },
    { name: 'AI Research Labs', industry: 'Artificial Intelligence', location: 'Los Angeles' },
    { name: 'Mobile Innovations', industry: 'Mobile Technology', location: 'San Diego' },
    { name: 'Web Architects', industry: 'Web Development', location: 'Miami' },
    { name: 'Quantum Leap Technologies', industry: 'Quantum Computing', location: 'Cambridge' },
    { name: 'Smart Systems', industry: 'IoT', location: 'Minneapolis' },
    { name: 'Blockchain Ventures', industry: 'Blockchain', location: 'New York' },
    { name: 'DevOps Masters', industry: 'DevOps', location: 'Austin' },
    { name: 'Financial Systems Inc.', industry: 'FinTech', location: 'Charlotte' },
    { name: 'HealthTech Solutions', industry: 'Healthcare IT', location: 'Boston' },
    { name: 'Educational Technologies', industry: 'EdTech', location: 'Philadelphia' },
  ];
  
  // Course data
  const courses = [
    'CSEN703', 'CSEN704', 'CSEN707', 'CSEN709', 'CSEN601', 
    'DMET502', 'DMET501', 'MENG710', 'CSEN701', 'CSEN702', 
    'CSEN705', 'CSEN708', 'CSEN710', 'INFS703', 'MACT701'
  ];
  
  // Supervisor names
  const supervisors = [
    'Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. James Williams', 'Emily Rodriguez, PhD', 
    'Dr. Robert Kim', 'Prof. Jennifer Martinez', 'Dr. David Thompson', 'Lisa Garcia, MSc', 
    'Dr. Thomas Wilson', 'Prof. Maria Lopez', 'Dr. William Anderson', 'Karen Taylor, PhD', 
    'Dr. Christopher Brown', 'Prof. Patricia Davis', 'Dr. Richard Miller', 'Emma White, MSc', 
    'Dr. Joseph Jones', 'Prof. Michelle Lee', 'Dr. Daniel Martin', 'Susan Hall, PhD',
    'Dr. Kevin Wilson', 'Prof. Nancy Clark', 'Dr. Brian Moore', 'Laura Adams, MSc',
    'Dr. Jeffrey Lewis', 'Prof. Angela Wright', 'Dr. Matthew Young', 'Stephanie Hill, PhD'
  ];
  
  // Student first names
  const firstNames = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'Lucas',
    'Mia', 'Oliver', 'Amelia', 'Elijah', 'Charlotte', 'Aiden', 'Harper', 'James', 'Abigail', 'Benjamin',
    'Emily', 'Alexander', 'Madison', 'Sebastian', 'Aria', 'Jackson', 'Ella', 'Daniel', 'Scarlett', 'Henry',
    'Grace', 'Michael', 'Chloe', 'Matthew', 'Lily', 'David', 'Zoe', 'Joseph', 'Layla', 'Jacob',
    'Sofia', 'Logan', 'Riley', 'Samuel', 'Hannah', 'John', 'Leah', 'Owen', 'Victoria', 'Nicholas',
    'Hailey', 'Ryan', 'Lila', 'Nathan', 'Natalie', 'Aaron', 'Maya', 'Christian', 'Aubrey', 'Jonathan'
  ];
  
  // Student last names
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
    'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King',
    'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter',
    'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins',
    'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey'
  ];
  
  // Status options
  const statusOptions = ['Accepted', 'Rejected', 'Flagged', 'Pending', 'Accepted', 'Accepted']; // Weighted for more accepted reports
  
  // Helper function to generate a random date within a range
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  
  // Helper function to format date to YYYY-MM-DD
  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }
  
  // Generate a large set of reports
  function generateReports(count) {
    const reports = [];
    
    for (let i = 1; i <= count; i++) {
      // Generate random start date between Jan 2023 and May 2024
      const startDate = randomDate(new Date(2023, 0, 1), new Date(2024, 4, 30));
      
      // End date is 2-3 months after start date
      const internshipLength = Math.floor(Math.random() * 30) + 60; // 60-90 days
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + internshipLength);
      
      // Random company
      const companyIndex = Math.floor(Math.random() * companies.length);
      
      // Random supervisor
      const supervisorIndex = Math.floor(Math.random() * supervisors.length);
      
      // Random student name
      const firstNameIndex = Math.floor(Math.random() * firstNames.length);
      const lastNameIndex = Math.floor(Math.random() * lastNames.length);
      const studentName = `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`;
      
      // Random status
      const statusIndex = Math.floor(Math.random() * statusOptions.length);
      
      reports.push({
        id: i,
        studentName,
        companyName: companies[companyIndex].name,
        supervisor: supervisors[supervisorIndex],
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        status: statusOptions[statusIndex],
        industry: companies[companyIndex].industry,
        location: companies[companyIndex].location
      });
    }
    
    return reports;
  }
  
  // Generate evaluations based on reports
  function generateEvaluations(reports) {
    const evaluations = [];
    let evalId = 1;
    
    reports.forEach(report => {
      // Only generate evaluations for non-pending reports
      if (report.status !== 'Pending') {
        // Random course
        const courseIndex = Math.floor(Math.random() * courses.length);
        
        // Random rating
        let rating;
        if (report.status === 'Accepted') {
          // Higher ratings for accepted reports (3.5-5.0)
          rating = (Math.random() * 1.5 + 3.5).toFixed(1);
        } else if (report.status === 'Rejected') {
          // Lower ratings for rejected reports (1.0-3.0)
          rating = (Math.random() * 2.0 + 1.0).toFixed(1);
        } else {
          // Mid-range ratings for flagged reports (2.0-4.0)
          rating = (Math.random() * 2.0 + 2.0).toFixed(1);
        }
        
        // Random review time (faster for higher ratings)
        let reviewTimeDays;
        if (parseFloat(rating) >= 4.0) {
          reviewTimeDays = Math.floor(Math.random() * 5) + 1; // 1-5 days
        } else if (parseFloat(rating) >= 3.0) {
          reviewTimeDays = Math.floor(Math.random() * 7) + 3; // 3-9 days
        } else {
          reviewTimeDays = Math.floor(Math.random() * 10) + 5; // 5-14 days
        }
        
        // Add evaluation
        evaluations.push({
          id: evalId++,
          reportId: report.id,
          rating: parseFloat(rating),
          course: courses[courseIndex],
          companyName: report.companyName,
          reviewTimeDays,
          industry: report.industry,
          location: report.location,
          evaluationDate: formatDate(new Date(new Date(report.endDate).getTime() + reviewTimeDays * 86400000))
        });
        
        // Some reports have multiple evaluations
        if (Math.random() > 0.7 && parseFloat(rating) >= 3.5) {
          const secondCourseIndex = (courseIndex + 1) % courses.length;
          const secondRating = (parseFloat(rating) + (Math.random() * 0.6 - 0.3)).toFixed(1);
          
          evaluations.push({
            id: evalId++,
            reportId: report.id,
            rating: parseFloat(secondRating),
            course: courses[secondCourseIndex],
            companyName: report.companyName,
            reviewTimeDays: reviewTimeDays + Math.floor(Math.random() * 3),
            industry: report.industry,
            location: report.location,
            evaluationDate: formatDate(new Date(new Date(report.endDate).getTime() + (reviewTimeDays + 2) * 86400000))
          });
        }
      }
    });
    
    return evaluations;
  }
  
  // Generate the data
  const initialReports = generateReports(150);
  const initialEvaluations = generateEvaluations(initialReports);
  
  export { initialReports, initialEvaluations };