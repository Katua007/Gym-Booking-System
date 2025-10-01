import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Classes from './components/Classes';
import Bookings from './components/Bookings';
import Trainers from './components/Trainers';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetch('/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Invalid token');
      })
      .then(userData => {
        setUser(userData);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setToken(null);
      });
    }
  }, [token]);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        {token && <Navbar user={user} onLogout={handleLogout} />}
        <main className="main-content">
          <Routes>
            <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
            <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/" element={token ? <Dashboard user={user} /> : <Login onLogin={handleLogin} />} />
            <Route path="/classes" element={token ? <Classes token={token} /> : <Navigate to="/" />} />
            <Route path="/bookings" element={token ? <Bookings token={token} /> : <Navigate to="/" />} />
            <Route path="/trainers" element={token ? <Trainers token={token} /> : <Navigate to="/" />} />
            <Route path="/profile" element={token ? <Profile user={user} token={token} /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;