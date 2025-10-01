import React, { useState, useEffect } from 'react';

function Bookings({ token }) {
  const [bookings, setBookings] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState({});

  useEffect(() => {
    fetchBookings();
    fetchClasses();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch('/classes');
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancelLoading({ ...cancelLoading, [bookingId]: true });

    try {
      const response = await fetch(`/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      if (response.ok) {
        alert('Booking cancelled successfully!');
        fetchBookings(); // Refresh bookings
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setCancelLoading({ ...cancelLoading, [bookingId]: false });
    }
  };

  const getClassDetails = (classId) => {
    return classes.find(cls => cls.id === classId) || {};
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
  };

  const isUpcoming = (startTime) => {
    return new Date(startTime) > new Date();
  };

  const groupBookingsByStatus = () => {
    const upcoming = bookings.filter(booking => {
      const classDetails = getClassDetails(booking.class_id);
      return booking.status === 'confirmed' && isUpcoming(classDetails.start_time);
    });

    const past = bookings.filter(booking => {
      const classDetails = getClassDetails(booking.class_id);
      return booking.status === 'confirmed' && !isUpcoming(classDetails.start_time);
    });

    const cancelled = bookings.filter(booking => booking.status === 'cancelled');

    return { upcoming, past, cancelled };
  };

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  const { upcoming, past, cancelled } = groupBookingsByStatus();

  return (
    <div className="bookings-page fade-in">
      <div className="page-header">
        <h1>📅 My Bookings</h1>
        <p>Manage your gym class reservations</p>
      </div>

      <div className="bookings-stats card">
        <div className="stats-grid grid grid-3">
          <div className="stat-item">
            <div className="stat-number">{upcoming.length}</div>
            <div className="stat-label">Upcoming</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{past.length}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{cancelled.length}</div>
            <div className="stat-label">Cancelled</div>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="bookings-section">
        <h2>🔥 Upcoming Classes</h2>
        {upcoming.length > 0 ? (
          <div className="bookings-grid grid grid-2">
            {upcoming.map((booking) => {
              const classDetails = getClassDetails(booking.class_id);
              const { date, time } = formatDateTime(classDetails.start_time || '');
              const isLoading = cancelLoading[booking.id];

              return (
                <div key={booking.id} className="booking-card card">
                  <div className="booking-header">
                    <h3>{classDetails.name || 'Unknown Class'}</h3>
                    <span className="booking-status status-confirmed">
                      Confirmed
                    </span>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      📅 <strong>Date:</strong> {date}
                    </div>
                    <div className="detail-item">
                      🕐 <strong>Time:</strong> {time}
                    </div>
                    <div className="detail-item">
                      👨💼 <strong>Trainer:</strong> ID {classDetails.trainer_id}
                    </div>
                    <div className="detail-item">
                      💰 <strong>Price:</strong> ${classDetails.price || 0}
                    </div>
                    {classDetails.difficulty_level && (
                      <div className="detail-item">
                        📊 <strong>Level:</strong> 
                        <span className={`difficulty-badge difficulty-${classDetails.difficulty_level.toLowerCase()}`}>
                          {classDetails.difficulty_level}
                        </span>
                      </div>
                    )}
                  </div>

                  {booking.notes && (
                    <div className="booking-notes">
                      <strong>Notes:</strong> {booking.notes}
                    </div>
                  )}

                  <div className="booking-actions">
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="btn btn-danger"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Cancelling...' : 'Cancel Booking'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state card">
            <h3>No upcoming bookings</h3>
            <p>Ready to book your next workout?</p>
            <a href="/classes" className="btn btn-primary">Browse Classes</a>
          </div>
        )}
      </div>

      {/* Past Bookings */}
      {past.length > 0 && (
        <div className="bookings-section">
          <h2>✅ Completed Classes</h2>
          <div className="bookings-grid grid grid-2">
            {past.map((booking) => {
              const classDetails = getClassDetails(booking.class_id);
              const { date, time } = formatDateTime(classDetails.start_time || '');

              return (
                <div key={booking.id} className="booking-card card past-booking">
                  <div className="booking-header">
                    <h3>{classDetails.name || 'Unknown Class'}</h3>
                    <span className="booking-status status-completed">
                      Completed
                    </span>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      📅 {date} at {time}
                    </div>
                    <div className="detail-item">
                      👨💼 Trainer ID: {classDetails.trainer_id}
                    </div>
                    <div className="detail-item">
                      💰 ${classDetails.price || 0}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cancelled Bookings */}
      {cancelled.length > 0 && (
        <div className="bookings-section">
          <h2>❌ Cancelled Bookings</h2>
          <div className="bookings-grid grid grid-2">
            {cancelled.map((booking) => {
              const classDetails = getClassDetails(booking.class_id);
              const { date, time } = formatDateTime(classDetails.start_time || '');

              return (
                <div key={booking.id} className="booking-card card cancelled-booking">
                  <div className="booking-header">
                    <h3>{classDetails.name || 'Unknown Class'}</h3>
                    <span className="booking-status status-cancelled">
                      Cancelled
                    </span>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      📅 {date} at {time}
                    </div>
                    <div className="detail-item">
                      📅 Cancelled on: {new Date(booking.booking_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {bookings.length === 0 && (
        <div className="empty-state card">
          <h3>No bookings yet</h3>
          <p>Start your fitness journey by booking your first class!</p>
          <a href="/classes" className="btn btn-primary">Browse Classes</a>
        </div>
      )}
    </div>
  );
}

export default Bookings;