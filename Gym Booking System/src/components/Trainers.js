import React, { useState, useEffect } from 'react';

function Trainers({ token }) {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await fetch('/trainers');
      if (response.ok) {
        const data = await response.json();
        setTrainers(data);
      }
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || 
                                 trainer.specialization?.toLowerCase().includes(selectedSpecialization.toLowerCase());
    
    return matchesSearch && matchesSpecialization;
  });

  const getUniqueSpecializations = () => {
    const specializations = trainers
      .map(trainer => trainer.specialization)
      .filter(spec => spec)
      .filter((spec, index, arr) => arr.indexOf(spec) === index);
    return specializations;
  };

  if (loading) {
    return <div className="loading">Loading trainers...</div>;
  }

  return (
    <div className="trainers-page fade-in">
      <div className="page-header">
        <h1>👨💼 Our Trainers</h1>
        <p>Meet our certified fitness professionals</p>
      </div>

      <div className="filters-section card">
        <h3>🔍 Find a Trainer</h3>
        <div className="filters-grid grid grid-2">
          <div className="form-group">
            <label htmlFor="search">Search Trainers</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              placeholder="Search by name or bio..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <select
              id="specialization"
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="form-control"
            >
              <option value="">All Specializations</option>
              {getUniqueSpecializations().map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="trainers-grid grid grid-3">
        {filteredTrainers.length > 0 ? (
          filteredTrainers.map((trainer) => (
            <div key={trainer.id} className="trainer-card card">
              <div className="trainer-avatar">
                {trainer.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="trainer-info">
                <h3 className="trainer-name">{trainer.name}</h3>
                
                {trainer.specialization && (
                  <div className="trainer-specialization">
                    🏷️ {trainer.specialization}
                  </div>
                )}
                
                <div className="trainer-details">
                  {trainer.experience_years > 0 && (
                    <div className="detail-item">
                      📅 {trainer.experience_years} years experience
                    </div>
                  )}
                  
                  {trainer.hourly_rate > 0 && (
                    <div className="detail-item">
                      💰 ${trainer.hourly_rate}/hour
                    </div>
                  )}
                  
                  {trainer.phone_number && (
                    <div className="detail-item">
                      📞 {trainer.phone_number}
                    </div>
                  )}
                  
                  {trainer.email && (
                    <div className="detail-item">
                      📧 {trainer.email}
                    </div>
                  )}
                </div>
                
                {trainer.bio && (
                  <div className="trainer-bio">
                    <p>{trainer.bio}</p>
                  </div>
                )}
                
                <div className="trainer-status">
                  <span className={`status-badge ${trainer.is_available ? 'available' : 'unavailable'}`}>
                    {trainer.is_available ? '✅ Available' : '❌ Unavailable'}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h3>No trainers found</h3>
            <p>Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {trainers.length === 0 && (
        <div className="empty-state card">
          <h3>No trainers available</h3>
          <p>Check back later for our amazing trainers!</p>
        </div>
      )}
    </div>
  );
}

export default Trainers;