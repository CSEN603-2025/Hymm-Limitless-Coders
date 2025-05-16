



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import internships from '../data/internships';
import "../css/Internships.css";

const videoLinks = {
  "Computer Science": "https://www.youtube.com/embed/LkQpoAz09_0", // Ultimate Internship Guide for CS Students
  "Electrical Engineering": "https://www.youtube.com/embed/9bKUlV8iRHY", // How I Landed 3 EE Internships
  "Mechanical Engineering": "https://www.youtube.com/embed/lv5AZmUZR9U", // Got 5 ME Internship Offers
  "Information Systems": "https://www.youtube.com/embed/qtM-ZPXSxrQ", // UPS Info Systems Internship Experience
};


const InternshipList = () => {
  const role = localStorage.getItem('role');
  const selectedInternships = role === 'prostudent' ? internships.pro : internships.regular;

  // Retrieve major from local storage
 const selectedMajorSemester = JSON.parse(localStorage.getItem("selectedMajorSemester") || "{}");
const selectedMajor = selectedMajorSemester.major || "";


  // Popup state for multiple messages
  const [popupMessages, setPopupMessages] = useState([]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [paidFilter, setPaidFilter] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);

    const today = new Date();
    const upcomingInternships = selectedInternships.filter(intern => {
      if (!intern.startDate) return false;
      const startDate = new Date(intern.startDate);
      const diffDays = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 2;
    });

    // if (upcomingInternships.length > 0) {
    //   const messages = upcomingInternships.map(
    //     i => `Upcoming internship: ${i.title} at ${i.company} starts soon!`
    //   );

      

    //   setPopupMessages(messages);

    //   setTimeout(() => setPopupMessages([]), 5000);
    // }
 if (upcomingInternships.length > 0) {
      const messages =["Internship cycle about to begin !"]
    
      

    
      setPopupMessages(messages);

      setTimeout(() => setPopupMessages([]), 7000);
    }



  }, [selectedInternships]);

  const filteredInternships = selectedInternships.filter(i => {
    const matchesSearch =
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.company.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter ? i.type === typeFilter : true;
    const matchesIndustry = industryFilter ? i.industry.toLowerCase() === industryFilter.toLowerCase() : true;
    const matchesDuration = durationFilter ? i.duration === durationFilter : true;
    const matchesPaid = paidFilter
      ? paidFilter === 'paid'
        ? i.paid === true
        : i.paid === false
      : true;

    return matchesSearch && matchesType && matchesIndustry && matchesDuration && matchesPaid;
  });

  const handleView = (intern) => {
    navigate(`/internship/${intern.id}`);
  };

  const handleApply = (intern) => {
    navigate(`/internships/apply/${intern.id}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSearch('');
    setTypeFilter('');
    setIndustryFilter('');
    setDurationFilter('');
    setPaidFilter('');
  };

  const handleSearch = () => {
    setSearch(searchTerm);
  };

  const canApply = () => {
    return userRole === 'student' || userRole === 'prostudent';
  };

  return (
    <div className="internship-list-container" style={{ paddingTop: '30px' }}>
      {/* === Embedded YouTube Video Section === */}
      {selectedMajor && videoLinks[selectedMajor] && (
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h3>
             {/* internships count towards my internship requirement */}
            <br />
            <small>({selectedMajor})</small>
          </h3>
          <iframe
            width="640"
            height="360"
            src={videoLinks[selectedMajor]}
            title={`Internship Info Video - ${selectedMajor}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: '20px', borderRadius: '10px' }}
          ></iframe>
        </div>
      )}

      {/* Popup Notifications */}
      <div className="popup-container">
        {popupMessages.map((msg, index) => (
          <div key={index} className="popup-notification">
            <span>{msg}</span>
            <button className="close-btn" onClick={() => {
              const updatedMessages = [...popupMessages];
              updatedMessages.splice(index, 1);
              setPopupMessages(updatedMessages);
            }}>×</button>
          </div>
        ))}
      </div>

      <h2 className="internship-list-header">All Internships</h2>

      {/* Search Input */}
      <div className="search-container">
        <input
          style={{ width: '400px' }}
          placeholder="Search internships by title or company"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        <button onClick={clearFilters} className="clear-button">Clear</button>
      </div>

      {/* Filters */}
      <div className="filter-container" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <select onChange={e => setTypeFilter(e.target.value)} value={typeFilter} className="filter-select">
          <option value="">All Types</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <select onChange={e => setIndustryFilter(e.target.value)} value={industryFilter} className="filter-select">
          <option value="">All Industries</option>
          <option value="Software">Software</option>
          <option value="Hardware">Hardware</option>
          <option value="Data Science">Data Science</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select onChange={e => setDurationFilter(e.target.value)} value={durationFilter} className="filter-select">
          <option value="">All Durations</option>
          <option value="2 months">2 months</option>
          <option value="3 months">3 months</option>
          <option value="4 months">4 months</option>
          <option value="5 months">5 months</option>
          <option value="6 months">6 months</option>
        </select>
        <select onChange={e => setPaidFilter(e.target.value)} value={paidFilter} className="filter-select">
          <option value="">All Payment Types</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {/* Internship List */}
      <ul className="internship-list" style={{ marginTop: '20px' }}>
        {filteredInternships.length === 0 && (
          <li>No internships found matching the criteria.</li>
        )}
        {filteredInternships.map(intern => (
          <li key={intern.id} className="internship-item">
            <strong>{intern.title}</strong>
            <p><em>{intern.company}</em> - {intern.duration}</p>
            <p>{intern.description}</p>
            <div className="internship-buttons">
              <button onClick={() => handleView(intern)} className="view-button">View</button>
              {canApply() && (
                <button onClick={() => handleApply(intern)} className="apply-button">Apply</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InternshipList;
