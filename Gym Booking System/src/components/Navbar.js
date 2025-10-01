import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          💪 GymBook Pro
        </Link>
        
        <div className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/classes" 
            className={`nav-link ${location.pathname === '/classes' ? 'active' : ''}`}
          >
            Classes
          </Link>
          <Link 
            to="/bookings" 
            className={`nav-link ${location.pathname === '/bookings' ? 'active' : ''}`}
          >
            My Bookings
          </Link>
          <Link 
            to="/trainers" 
            className={`nav-link ${location.pathname === '/trainers' ? 'active' : ''}`}
          >
            Trainers
          </Link>
        </div>

        <div className="nav-user">
          <Link to="/profile" className="user-profile">
            <div className="user-avatar">
              {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
            </div>
            <span className="user-name">
              {user?.first_name} {user?.last_name}
            </span>
          </Link>
          <button onClick={onLogout} className="btn btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;