from app import app
from models import db, User, Trainer, GymClass, Equipment
from datetime import datetime, timedelta

def seed_data():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Create admin user
        admin = User(
            username='admin',
            email='admin@gym.com',
            first_name='Admin',
            last_name='User',
            phone='1234567890',
            role='admin'
        )
        admin.set_password('admin123')
        
        # Create sample members
        member1 = User(
            username='john_doe',
            email='john@example.com',
            first_name='John',
            last_name='Doe',
            phone='9876543210',
            role='member'
        )
        member1.set_password('password123')
        
        member2 = User(
            username='jane_smith',
            email='jane@example.com',
            first_name='Jane',
            last_name='Smith',
            phone='5555555555',
            role='member'
        )
        member2.set_password('password123')
        
        # Create trainers
        trainer1 = Trainer(
            name='Mike Johnson',
            bio='Certified personal trainer with 8 years of experience in strength training and bodybuilding.',
            specialization='Strength Training',
            phone_number='1111111111',
            email='mike@gym.com',
            experience_years=8,
            hourly_rate=75.0
        )
        
        trainer2 = Trainer(
            name='Sarah Wilson',
            bio='Yoga instructor and wellness coach specializing in mindfulness and flexibility.',
            specialization='Yoga',
            phone_number='2222222222',
            email='sarah@gym.com',
            experience_years=5,
            hourly_rate=60.0
        )
        
        trainer3 = Trainer(
            name='David Chen',
            bio='High-intensity interval training specialist and former athlete.',
            specialization='HIIT',
            phone_number='3333333333',
            email='david@gym.com',
            experience_years=6,
            hourly_rate=70.0
        )
        
        # Add users and trainers to session
        db.session.add_all([admin, member1, member2, trainer1, trainer2, trainer3])
        db.session.commit()
        
        # Create gym classes
        now = datetime.now()
        
        classes = [
            GymClass(
                name='Morning Strength Training',
                description='Build muscle and increase strength with compound movements.',
                trainer_id=trainer1.id,
                start_time=now + timedelta(days=1, hours=8),
                end_time=now + timedelta(days=1, hours=9),
                max_capacity=15,
                price=25.0,
                difficulty_level='Intermediate',
                category='Strength'
            ),
            GymClass(
                name='Sunrise Yoga',
                description='Start your day with peaceful yoga flow and meditation.',
                trainer_id=trainer2.id,
                start_time=now + timedelta(days=1, hours=7),
                end_time=now + timedelta(days=1, hours=8),
                max_capacity=20,
                price=20.0,
                difficulty_level='Beginner',
                category='Yoga'
            ),
            GymClass(
                name='HIIT Bootcamp',
                description='High-intensity workout to burn calories and build endurance.',
                trainer_id=trainer3.id,
                start_time=now + timedelta(days=1, hours=18),
                end_time=now + timedelta(days=1, hours=19),
                max_capacity=12,
                price=30.0,
                difficulty_level='Advanced',
                category='Cardio'
            ),
            GymClass(
                name='Evening Yoga Flow',
                description='Relax and unwind with gentle yoga stretches.',
                trainer_id=trainer2.id,
                start_time=now + timedelta(days=2, hours=19),
                end_time=now + timedelta(days=2, hours=20),
                max_capacity=18,
                price=20.0,
                difficulty_level='Beginner',
                category='Yoga'
            ),
            GymClass(
                name='Powerlifting Workshop',
                description='Learn proper form for deadlifts, squats, and bench press.',
                trainer_id=trainer1.id,
                start_time=now + timedelta(days=3, hours=10),
                end_time=now + timedelta(days=3, hours=12),
                max_capacity=8,
                price=50.0,
                difficulty_level='Advanced',
                category='Strength'
            )
        ]
        
        # Create equipment
        equipment = [
            Equipment(
                name='Treadmill Pro X1',
                category='Cardio',
                brand='FitnessTech',
                model='PTX-2023',
                purchase_date=datetime(2023, 1, 15),
                status='available',
                location='Cardio Zone A'
            ),
            Equipment(
                name='Olympic Barbell Set',
                category='Strength',
                brand='IronMax',
                model='OB-45',
                purchase_date=datetime(2022, 8, 20),
                status='available',
                location='Free Weights Area'
            ),
            Equipment(
                name='Yoga Mats (Set of 25)',
                category='Yoga',
                brand='ZenFlex',
                model='YM-Premium',
                purchase_date=datetime(2023, 3, 10),
                status='available',
                location='Studio 1'
            ),
            Equipment(
                name='Cable Machine Deluxe',
                category='Strength',
                brand='PowerGym',
                model='CM-5000',
                purchase_date=datetime(2022, 12, 5),
                status='available',
                location='Strength Training Zone'
            )
        ]
        
        # Add classes and equipment to session
        db.session.add_all(classes + equipment)
        db.session.commit()
        
        print("Database seeded successfully!")
        print(f"Created {len([admin, member1, member2])} users")
        print(f"Created {len([trainer1, trainer2, trainer3])} trainers")
        print(f"Created {len(classes)} classes")
        print(f"Created {len(equipment)} equipment items")

if __name__ == '__main__':
    seed_data()