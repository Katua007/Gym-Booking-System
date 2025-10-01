# 🏋️ GymBook Pro - Complete Gym Booking System

A modern, full-stack gym booking application built with Flask (Python) backend and React frontend. Features user authentication, class management, booking system, and trainer profiles.

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login with JWT authentication
- Role-based access (Admin, Member)
- Profile management and editing
- Secure password hashing with bcrypt

### 🏃♂️ Class Management
- Browse available gym classes
- Filter by category, difficulty level, and search
- Real-time availability tracking
- Class scheduling with trainer assignment

### 📅 Booking System
- Book and cancel classes
- View upcoming, completed, and cancelled bookings
- Booking status management
- Automatic capacity management

### 👨💼 Trainer Profiles
- Detailed trainer information
- Specialization and experience tracking
- Contact information and hourly rates
- Availability status

### 📊 Dashboard & Analytics
- Personal dashboard with statistics
- Upcoming classes overview
- Recent activity tracking
- Quick action shortcuts

### 🎨 Modern UI/UX
- Responsive design with glassmorphism effects
- Gradient backgrounds and smooth animations
- Mobile-friendly interface
- Intuitive navigation

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Katua007/Gym-Booking-System.git
   cd Gym-Booking-System
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application:**
   ```bash
   python run.py
   ```
   
   This will:
   - Set up the database
   - Optionally seed with sample data
   - Start the Flask server on http://localhost:5000

### Frontend Setup

1. **Navigate to the React app:**
   ```bash
   cd "Gym Booking System"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   
   The React app will run on http://localhost:3000

## 🔑 Demo Credentials

After seeding the database, you can use these credentials:

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Member Account:**
- Username: `john_doe`
- Password: `password123`

## 📁 Project Structure

```
Gym-Booking-System/
├── flask_restful-api/          # Backend Flask application
│   ├── app.py                  # Main Flask application
│   ├── models.py               # Database models
│   ├── seed.py                 # Database seeding script
│   └── migrations/             # Database migrations
├── Gym Booking System/         # Frontend React application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── App.js             # Main App component
│   │   ├── App.css            # Global styles
│   │   └── index.css          # Additional styles
│   └── public/                # Static files
├── requirements.txt           # Python dependencies
├── run.py                    # Main application runner
└── README.md                 # This file
```

## 🛠️ API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login

### Users
- `GET /users` - Get all users (admin only)
- `GET /profile` - Get current user profile
- `PATCH /profile` - Update user profile

### Classes
- `GET /classes` - Get all gym classes
- `POST /classes` - Create new class (admin only)
- `GET /classes/<id>` - Get specific class
- `PATCH /classes/<id>` - Update class (admin only)
- `DELETE /classes/<id>` - Cancel class (admin only)

### Bookings
- `GET /bookings` - Get user's bookings
- `POST /bookings` - Create new booking
- `GET /bookings/<id>` - Get specific booking
- `PATCH /bookings/<id>` - Update booking (cancel)

### Trainers
- `GET /trainers` - Get all trainers
- `POST /trainers` - Create new trainer (admin only)
- `GET /trainers/<id>` - Get specific trainer
- `PATCH /trainers/<id>` - Update trainer (admin only)
- `DELETE /trainers/<id>` - Deactivate trainer (admin only)

## 🗄️ Database Schema

### Users
- User authentication and profile information
- Role-based permissions (admin, member)
- Account status and creation tracking

### Trainers
- Professional trainer profiles
- Specializations and experience
- Contact information and rates

### Gym Classes
- Class scheduling and details
- Capacity and booking management
- Difficulty levels and categories

### Bookings
- User class reservations
- Status tracking (confirmed, cancelled, completed)
- Payment status integration ready

### Equipment
- Gym equipment inventory
- Maintenance tracking
- Location and status management

## 🎨 Design Features

- **Glassmorphism UI**: Modern frosted glass effects
- **Gradient Backgrounds**: Beautiful color transitions
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Engaging user interactions
- **Intuitive Navigation**: Easy-to-use interface

## 🔧 Development

### Adding New Features

1. **Backend**: Add new routes in `app.py` and models in `models.py`
2. **Frontend**: Create new components in `src/components/`
3. **Styling**: Add styles to `App.css` or `index.css`

### Database Migrations

```bash
cd flask_restful-api
flask db init
flask db migrate -m "Description"
flask db upgrade
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Flask and React communities
- Modern UI/UX design inspiration
- Fitness industry best practices

---

**Ready to transform your gym experience? Start booking today! 💪**