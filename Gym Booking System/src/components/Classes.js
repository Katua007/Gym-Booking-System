import React, { useState, useEffect } from 'react';

function Classes({ token }) {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    category: '',
    difficulty: '',
    search: ''
  });
  const [bookingLoading, setBookingLoading] = useState({});

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    filterClasses();
  }, [classes, filter]);

  const fetchClasses = async () => {
    try {
      const response = await fetch('https://gym-booking-system-server.vercel.app/classes');
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterClasses = () => {
    let filtered = classes;

    if (filter.category) {
      filtered = filtered.filter(cls => 
        cls.category?.toLowerCase().includes(filter.category.toLowerCase())
      );
    }

    if (filter.difficulty) {
      filtered = filtered.filter(cls => 
        cls.difficulty_level?.toLowerCase() === filter.difficulty.toLowerCase()
      );
    }

    if (filter.search) {
      filtered = filtered.filter(cls =>
        cls.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        cls.description?.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    setFilteredClasses(filtered);
  };

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const bookClass = async (classId) => {
    setBookingLoading({ ...bookingLoading, [classId]: true });

    try {
      const response = await fetch('/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ class_id: classId })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Class booked successfully!');
        fetchClasses(); // Refresh to update available spots
      } else {
        alert(data.message || 'Booking failed');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setBookingLoading({ ...bookingLoading, [classId]: false });
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
  };

  const isClassPast = (startTime) => {
    return new Date(startTime) < new Date();
  };

  if (loading) {
    return <div className="loading">Loading classes...</div>;
  }

  return (
    <div className="classes-page fade-in">
      <div className="page-header">
        <h1>🏃♂️ Gym Classes</h1>
        <p>Find and book the perfect workout for you</p>
      </div>

      <div className="filters-section card">
        <h3>🔍 Filter Classes</h3>
        <div className="filters-grid grid grid-3">
          <div className="form-group">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              name="search"
              value={filter.search}
              onChange={handleFilterChange}
              className="form-control"
              placeholder="Search classes..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">All Categories</option>
              <option value="Strength">Strength</option>
              <option value="Cardio">Cardio</option>
              <option value="Yoga">Yoga</option>
              <option value="HIIT">HIIT</option>
              <option value="Pilates">Pilates</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              value={filter.difficulty}
              onChange={handleFilterChange}
              className="form-control"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      <div className="classes-grid grid grid-2">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classItem) => {
            const { date, time } = formatDateTime(classItem.start_time);
            const isPast = isClassPast(classItem.start_time);
            const isLoading = bookingLoading[classItem.id];
            
            return (
              <div key={classItem.id} className={`class-card ${isPast ? 'past-class' : ''}`}>
                <div className="class-header">
                  <div>
                    <h3 className="class-title">{classItem.name}</h3>
                    <p className="class-trainer">👨💼 Trainer ID: {classItem.trainer_id}</p>
                  </div>
                  <span className={`difficulty-badge difficulty-${classItem.difficulty_level?.toLowerCase()}`}>
                    {classItem.difficulty_level}
                  </span>
                </div>

                <p className="class-description">{classItem.description}</p>

                <div className="class-meta">
                  <div className="meta-item">
                    📅 {date}
                  </div>
                  <div className="meta-item">
                    🕐 {time}
                  </div>
                  <div className="meta-item">
                    👥 {classItem.available_spots || (classItem.max_capacity - classItem.current_bookings)} spots left
                  </div>
                  <div className="meta-item">
                    💰 ${classItem.price}
                  </div>
                  {classItem.category && (
                    <div className="meta-item">
                      🏷️ {classItem.category}
                    </div>
                  )}
                </div>

                <div className="class-actions">
                  {isPast ? (
                    <button className="btn btn-secondary" disabled>
                      Class Ended
                    </button>
                  ) : classItem.is_full ? (
                    <button className="btn btn-secondary" disabled>
                      Fully Booked
                    </button>
                  ) : (
                    <button
                      onClick={() => bookClass(classItem.id)}
                      className="btn btn-success"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Booking...' : 'Book Class'}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <h3>No classes found</h3>
            <p>Try adjusting your filters or check back later for new classes.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Classes;