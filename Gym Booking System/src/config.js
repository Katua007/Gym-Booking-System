const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://gym-booking-system-server.vercel.app'
  : 'http://localhost:5000';

export default API_BASE_URL;