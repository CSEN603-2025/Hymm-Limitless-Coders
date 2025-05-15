
import React, { useState } from 'react';
import '../Styles/OnlineWorkshop.css';
import { FaSearch, FaTimes, FaEdit, FaTrash, FaCalendarAlt, FaClock, FaUser, FaListUl } from 'react-icons/fa';

// Dummy workshop data
const initialWorkshops = [
  {
    id: 1,
    name: "React Mastery Workshop",
    description: "Learn advanced React patterns and hooks.",
    startDate: "2025-06-01",
    startTime: "10:00",
    endDate: "2025-06-01",
    endTime: "16:00",
    speaker: "Jane Doe, Senior Developer at TechCorp",
    agenda: "1. Intro to React\n2. Hooks\n3. State Management\n4. Q&A",
  },
  {
    id: 2,
    name: "CSS Modern Design",
    description: "Explore CSS Grid and Flexbox for responsive layouts.",
    startDate: "2025-06-15",
    startTime: "09:00",
    endDate: "2025-06-15",
    endTime: "15:00",
    speaker: "John Smith, UI/UX Designer",
    agenda: "1. CSS Basics\n2. Flexbox\n3. Grid\n4. Workshop",
  },
  {
    id: 3,
    name: "JavaScript Deep Dive",
    description: "Master asynchronous JavaScript and ES6+ features.",
    startDate: "2025-07-01",
    startTime: "11:00",
    endDate: "2025-07-01",
    endTime: "17:00",
    speaker: "Alice Brown, JavaScript Expert",
    agenda: "1. Promises\n2. Async/Await\n3. ES6 Modules\n4. Practice",
  },
];

function OnlineWorkshop() {
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    speaker: "",
    agenda: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false); // New state for form visibility
  const itemsPerPage = 3; // Increased from 2 to 3

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Workshop name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.speaker.trim()) newErrors.speaker = "Speaker bio is required";
    if (!formData.agenda.trim()) newErrors.agenda = "Agenda is required";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (isEditing) {
        setWorkshops(
          workshops.map((workshop) =>
            workshop.id === formData.id ? { ...formData } : workshop
          )
        );
        setIsEditing(false);
      } else {
        const newWorkshop = {
          ...formData,
          id: workshops.length + 1,
        };
        setWorkshops([...workshops, newWorkshop]);
      }
      setFormData({
        id: null,
        name: "",
        description: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        speaker: "",
        agenda: "",
      });
      setErrors({});
      setIsSubmitting(false);
      setShowForm(false); // Hide form after submission
    }, 500);
  };

  const handleEdit = (workshop) => {
    setFormData(workshop);
    setIsEditing(true);
    setErrors({});
    setShowForm(true); // Show form when editing
    // Smooth scroll to form
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    // Show confirm dialog
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      setWorkshops(workshops.filter((workshop) => workshop.id !== id));
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const formatDate = (date, time) => {
    const formattedDate = new Date(date);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return `${formattedDate.toLocaleDateString('en-US', options)} at ${time}`;
  };

  const formatAgenda = (agenda) => {
    return agenda.split('\n').map((item, index) => (
      <div key={index} className="agenda-item">{item}</div>
    ));
  };

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearch = workshop.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      workshop.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      workshop.speaker
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filterMonth
      ? new Date(workshop.startDate).getMonth() + 1 === parseInt(filterMonth)
      : true;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredWorkshops.length / itemsPerPage);
  const paginatedWorkshops = filteredWorkshops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Workshop Management Portal</h1>
        <p>Manage your online workshops with ease</p>
      </header>
      
      <main className="main-content">
        {/* Button to toggle form visibility */}
        <div className="toggle-form-container">
          <button 
            className={`toggle-form-btn ${showForm ? 'active' : ''}`} 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Hide Form' : isEditing ? 'Edit Workshop' : 'Add New Workshop'}
          </button>
        </div>

        {/* Workshop Form */}
        <section className={`form-section ${showForm ? 'visible' : 'hidden'}`}>
          <div className="card form-card">
            <h2 className="card-header">
              {isEditing ? "Edit Workshop" : "Add Workshop"}
            </h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label" htmlFor="name">
                  Workshop Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`input ${errors.name ? "input-error" : ""}`}
                  value={formData.name}
                  onChange={handleInputChange}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  placeholder="Enter workshop name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="form-group form-group-full">
                <label className="label" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className={`input textarea ${errors.description ? "input-error" : ""}`}
                  value={formData.description}
                  onChange={handleInputChange}
                  aria-required="true"
                  aria-invalid={!!errors.description}
                  placeholder="Enter workshop description"
                  rows="3"
                />
                {errors.description && (
                  <span className="error-message">{errors.description}</span>
                )}
              </div>
              <div className="date-time-container">
                <div className="form-group">
                  <label className="label" htmlFor="startDate">
                    <FaCalendarAlt className="input-icon" /> Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className={`input ${errors.startDate ? "input-error" : ""}`}
                    value={formData.startDate}
                    onChange={handleInputChange}
                    aria-required="true"
                    aria-invalid={!!errors.startDate}
                  />
                  {errors.startDate && (
                    <span className="error-message">{errors.startDate}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="startTime">
                    <FaClock className="input-icon" /> Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    className={`input ${errors.startTime ? "input-error" : ""}`}
                    value={formData.startTime}
                    onChange={handleInputChange}
                    aria-required="true"
                    aria-invalid={!!errors.startTime}
                  />
                  {errors.startTime && (
                    <span className="error-message">{errors.startTime}</span>
                  )}
                </div>
              </div>
              <div className="date-time-container">
                <div className="form-group">
                  <label className="label" htmlFor="endDate">
                    <FaCalendarAlt className="input-icon" /> End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className={`input ${errors.endDate ? "input-error" : ""}`}
                    value={formData.endDate}
                    onChange={handleInputChange}
                    aria-required="true"
                    aria-invalid={!!errors.endDate}
                  />
                  {errors.endDate && (
                    <span className="error-message">{errors.endDate}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="endTime">
                    <FaClock className="input-icon" /> End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    className={`input ${errors.endTime ? "input-error" : ""}`}
                    value={formData.endTime}
                    onChange={handleInputChange}
                    aria-required="true"
                    aria-invalid={!!errors.endTime}
                  />
                  {errors.endTime && (
                    <span className="error-message">{errors.endTime}</span>
                  )}
                </div>
              </div>
              <div className="form-group form-group-full">
                <label className="label" htmlFor="speaker">
                  <FaUser className="input-icon" /> Speaker Bio
                </label>
                <input
                  type="text"
                  id="speaker"
                  name="speaker"
                  className={`input ${errors.speaker ? "input-error" : ""}`}
                  value={formData.speaker}
                  onChange={handleInputChange}
                  aria-required="true"
                  aria-invalid={!!errors.speaker}
                  placeholder="Enter speaker information"
                />
                {errors.speaker && (
                  <span className="error-message">{errors.speaker}</span>
                )}
              </div>
              <div className="form-group form-group-full">
                <label className="label" htmlFor="agenda">
                  <FaListUl className="input-icon" /> Agenda
                </label>
                <textarea
                  id="agenda"
                  name="agenda"
                  className={`input textarea ${errors.agenda ? "input-error" : ""}`}
                  value={formData.agenda}
                  onChange={handleInputChange}
                  aria-required="true"
                  aria-invalid={!!errors.agenda}
                  placeholder="Enter workshop agenda (one item per line)"
                  rows="4"
                />
                {errors.agenda && (
                  <span className="error-message">{errors.agenda}</span>
                )}
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Processing..."
                    : isEditing
                    ? "Update Workshop"
                    : "Add Workshop"}
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      id: null,
                      name: "",
                      description: "",
                      startDate: "",
                      startTime: "",
                      endDate: "",
                      endTime: "",
                      speaker: "",
                      agenda: "",
                    });
                    setErrors({});
                    setShowForm(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Workshop Listings */}
        <section className="table-section">
          <div className="card">
            <h2 className="card-header">Workshops List</h2>
            <div className="search-filter-container">
              <div className="search-container">
                <div className="search-wrapper">
                  
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search workshops by name, description or speaker..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search workshops"
                  />
                  {searchQuery && (
                    <button
                      className="clear-search-btn"
                      onClick={handleClearSearch}
                      aria-label="Clear search"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>
              <div className="filter-container">
                <label className="label" htmlFor="month-filter">
                  Filter by Month
                </label>
                <select
                  id="month-filter"
                  className="select-input"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                >
                  <option value="">All Months</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                </select>
              </div>
            </div>
            
            {/* Workshop Cards Instead of Table */}
            <div className="workshop-cards">
              {paginatedWorkshops.length > 0 ? (
                paginatedWorkshops.map((workshop) => (
                  <div key={workshop.id} className="workshop-card">
                    <div className="workshop-header">
                      <h3>{workshop.name}</h3>
                      <div className="workshop-actions">
                        <button
                          className="btn-icon btn-edit"
                          onClick={() => handleEdit(workshop)}
                          aria-label={`Edit workshop ${workshop.name}`}
                          title="Edit Workshop"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => handleDelete(workshop.id)}
                          aria-label={`Delete workshop ${workshop.name}`}
                          title="Delete Workshop"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <p className="workshop-description">{workshop.description}</p>
                    <div className="workshop-details">
                      <div className="details-item">
                        <FaCalendarAlt className="details-icon" />
                        <p>Start: {formatDate(workshop.startDate, workshop.startTime)}</p>
                      </div>
                      <div className="details-item">
                        <FaCalendarAlt className="details-icon" />
                        <p>End: {formatDate(workshop.endDate, workshop.endTime)}</p>
                      </div>
                      <div className="details-item">
                        <FaUser className="details-icon" />
                        <p>{workshop.speaker}</p>
                      </div>
                      <div className="details-item agenda-container">
                        <FaListUl className="details-icon" />
                        <div className="agenda-list">
                          {formatAgenda(workshop.agenda)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-workshops">
                  <p>No workshops found matching your criteria</p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-btn pagination-nav" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${
                        currentPage === page ? "pagination-btn-active" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button 
                  className="pagination-btn pagination-nav" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
     
    </div>
  );
}

export default OnlineWorkshop;