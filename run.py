#!/usr/bin/env python3
"""
Gym Booking System - Main Runner
This script initializes the database and starts the Flask application.
"""

import os
import sys
import sys
sys.path.append('flask_restful-api')
from app import app
from models import db

def setup_database():
    """Initialize the database with tables"""
    print("🔧 Setting up database...")
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully!")

def seed_database():
    """Seed the database with sample data"""
    print("🌱 Seeding database with sample data...")
    try:
        # Import and run the seed script
        import subprocess
        result = subprocess.run([sys.executable, 'flask_restful-api/seed.py'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Database seeded successfully!")
            print(result.stdout)
        else:
            print("❌ Error seeding database:")
            print(result.stderr)
    except Exception as e:
        print(f"❌ Error running seed script: {e}")

def main():
    """Main function to run the application"""
    print("🏋️ Starting Gym Booking System...")
    print("=" * 50)
    
    # Change to the correct directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Setup database
    setup_database()
    
    # Ask user if they want to seed the database
    seed_choice = input("\n🌱 Would you like to seed the database with sample data? (y/n): ").lower().strip()
    if seed_choice in ['y', 'yes']:
        seed_database()
    
    print("\n🚀 Starting Flask application...")
    print("📍 API will be available at: http://localhost:5000")
    print("📍 Frontend should be started separately with: npm start")
    print("=" * 50)
    
    # Start the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)

if __name__ == '__main__':
    main()