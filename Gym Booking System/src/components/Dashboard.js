import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    upcomingClasses: [],
    recentBookings: [],
    totalBookings: 0,
    activeClasses: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch user's bookings
        const bookingsResponse = await fetch('/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Fetch available classes
        const classesResponse = await fetch('/classes');
        
        if (bookingsResponse.ok && classesResponse.ok) {
          const bookings = await bookingsResponse.json();
          const classes = await classesResponse.json();
          
          // Filter upcoming classes from user's bookings
          const now = new Date();
          const upcomingBookings = bookings
            .filter(booking => {
              const classData = classes.find(c => c.id === booking.class_id);
              return classData && new Date(classData.start_time) > now && booking.status === 'confirmed';
            })
            .slice(0, 3);
          
          // Get class details for upcoming bookings
          const upcomingClasses = upcomingBookings.map(booking => {
            const classData = classes.find(c => c.id === booking.class_id);
            return { ...classData, booking_id: booking.id };
          });
          
          setStats({
            upcomingClasses,
            recentBookings: bookings.slice(0, 5),
            totalBookings: bookings.length,
            activeClasses: classes.filter(c => c.is_active).length
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.first_name}! 👋</h1>
        <p>Ready for your next workout?</p>
      </div>

      <div className="stats-grid grid grid-4">
        <div className="stat-card card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        
        <div className="stat-card card">
          <div className="stat-icon">🏃‍♂️</div>
          <div className="stat-info">
            <h3>{stats.upcomingClasses.length}</h3>
            <p>Upcoming Classes</p>
          </div>
        </div>
        
        <div className="stat-card card">
          <div className="stat-icon">💪</div>
          <div className="stat-info">
            <h3>{stats.activeClasses}</h3>
            <p>Available Classes</p>
          </div>
        </div>
        
        <div className="stat-card card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>{user?.role === 'admin' ? 'Admin' : 'Member'}</h3>
            <p>Account Type</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content grid grid-2">
        <div className="card">
          <div className="card-header">
            <h2>🔥 Upcoming Classes</h2>
            <Link to="/classes" className="btn btn-primary">View All</Link>
          </div>
          
          {stats.upcomingClasses.length > 0 ? (
            <div className="upcoming-classes">
              {stats.upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="upcoming-class-item">
                  <div className="class-info">
                    <h4>{classItem.name}</h4>
                    <p className="class-time">
                      📅 {formatDateTime(classItem.start_time)}
                    </p>
                    <p className="class-trainer">
                      👨‍💼 Trainer ID: {classItem.trainer_id}
                    </p>
                  </div>
                  <div className="class-actions">
                    <span className={`difficulty-badge difficulty-${classItem.difficulty_level?.toLowerCase()}`}>
                      {classItem.difficulty_level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No upcoming classes</h3>
              <p>Book a class to get started!</p>
              <Link to="/classes" className="btn btn-primary">Browse Classes</Link>
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-header">
            <h2>📋 Recent Activity</h2>
            <Link to="/bookings" className="btn btn-primary">View All</Link>
          </div>
          
          {stats.recentBookings.length > 0 ? (
            <div className="recent-bookings">
              {stats.recentBookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-info">
                    <p className="booking-date">
                      📅 {new Date(booking.booking_date).toLocaleDateString()}
                    </p>
                    <p className="booking-class">Class ID: {booking.class_id}</p>
                  </div>
                  <span className={`booking-status status-${booking.status}`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No bookings yet</h3>
              <p>Start your fitness journey today!</p>
              <Link to="/classes" className="btn btn-success">Book Your First Class</Link>
            </div>
          )}
        </div>
      </div>

      <div className="quick-actions card">
        <h2>⚡ Quick Actions</h2>
        <div className="actions-grid grid grid-4">
          <Link to="/classes" className="action-btn btn btn-primary">
            📚 Browse Classes
          </Link>
          <Link to="/bookings" className="action-btn btn btn-success">
            📅 My Bookings
          </Link>
          <Link to="/trainers" className="action-btn btn btn-warning">
            👨‍💼 View Trainers
          </Link>
          <Link to="/profile" className="action-btn btn btn-info">
            👤 Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;