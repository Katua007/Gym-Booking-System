import React, { useState } from 'react';

function Profile({ user, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    username: user?.username || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
        // Update user data in parent component would require callback
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Update failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setFormData({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      username: user?.username || ''
    });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="profile-page fade-in">
      <div className="page-header">
        <h1>👤 My Profile</h1>
        <p>Manage your account information</p>
      </div>

      <div className="profile-container grid grid-2">
        <div className="profile-card card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
            </div>
            <div className="profile-info">
              <h2>{user?.first_name} {user?.last_name}</h2>
              <p className="profile-role">{user?.role || 'Member'}</p>
              <p className="profile-member-since">
                Member since: {formatDate(user?.created_at)}
              </p>
            </div>
          </div>

          {message.text && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="profile-details">
            {!isEditing ? (
              <div className="profile-view">
                <div className="detail-group">
                  <label>Username</label>
                  <p>{user?.username}</p>
                </div>
                
                <div className="detail-group">
                  <label>Email</label>
                  <p>{user?.email}</p>
                </div>
                
                <div className="detail-group">
                  <label>Phone</label>
                  <p>{user?.phone || 'Not provided'}</p>
                </div>
                
                <div className="detail-group">
                  <label>Account Status</label>
                  <p>
                    <span className={`status-badge ${user?.is_active ? 'active' : 'inactive'}`}>
                      {user?.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>

                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="profile-edit">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    type="button" 
                    onClick={cancelEdit}
                    className="btn btn-secondary"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="profile-stats card">
          <h3>📊 Account Statistics</h3>
          
          <div className="stats-list">
            <div className="stat-item">
              <div className="stat-icon">🏃♂️</div>
              <div className="stat-info">
                <div className="stat-label">Account Type</div>
                <div className="stat-value">{user?.role || 'Member'}</div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <div className="stat-label">Member Since</div>
                <div className="stat-value">{formatDate(user?.created_at)}</div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <div className="stat-label">Account Status</div>
                <div className="stat-value">
                  {user?.is_active ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <h4>Quick Actions</h4>
            <div className="actions-list">
              <a href="/classes" className="action-link">
                📚 Browse Classes
              </a>
              <a href="/bookings" className="action-link">
                📅 View Bookings
              </a>
              <a href="/trainers" className="action-link">
                👨💼 Meet Trainers
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;