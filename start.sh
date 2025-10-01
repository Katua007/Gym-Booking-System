#!/bin/bash

echo "🏋️ GymBook Pro - Starting Application"
echo "====================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install Python dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "📦 Installing Python dependencies..."
    pip3 install -r requirements.txt
fi

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd "Gym Booking System"
npm install
cd ..

echo ""
echo "🚀 Setup complete!"
echo ""
echo "To start the application:"
echo "1. Backend: python3 run.py"
echo "2. Frontend: cd 'Gym Booking System' && npm start"
echo ""
echo "Or run them in separate terminals:"
echo "Terminal 1: python3 run.py"
echo "Terminal 2: cd 'Gym Booking System' && npm start"
echo ""
echo "📍 Backend will run on: http://localhost:5000"
echo "📍 Frontend will run on: http://localhost:3000"
echo ""
echo "Happy coding! 💪"