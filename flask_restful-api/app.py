from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta, datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gym.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'gym-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

db = SQLAlchemy(app)
api = Api(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(15))
    role = db.Column(db.String(20), default='member')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'role': self.role,
            'is_active': self.is_active
        }

class Register(Resource):
    def post(self):
        try:
            data = request.get_json()
            
            if User.query.filter_by(username=data['username']).first():
                return {'message': 'Username already exists'}, 400
            
            user = User(
                username=data['username'],
                email=data['email'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                phone=data.get('phone')
            )
            user.set_password(data['password'])
            
            db.session.add(user)
            db.session.commit()
            
            return {'message': 'User registered successfully'}, 201
        except Exception as e:
            return {'message': str(e)}, 500

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        
        if user and user.check_password(data['password']):
            access_token = create_access_token(identity=user.id)
            return {
                'access_token': access_token,
                'user': user.to_dict()
            }, 200
        
        return {'message': 'Invalid credentials'}, 401

class Trainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text)
    specialization = db.Column(db.String(100))
    phone_number = db.Column(db.String(15))
    email = db.Column(db.String(120))
    experience_years = db.Column(db.Integer, default=0)
    hourly_rate = db.Column(db.Float, default=0.0)
    is_available = db.Column(db.Boolean, default=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'bio': self.bio,
            'specialization': self.specialization,
            'phone_number': self.phone_number,
            'email': self.email,
            'experience_years': self.experience_years,
            'hourly_rate': self.hourly_rate,
            'is_available': self.is_available
        }

class GymClass(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    max_capacity = db.Column(db.Integer, default=20)
    current_bookings = db.Column(db.Integer, default=0)
    price = db.Column(db.Float, default=0.0)
    difficulty_level = db.Column(db.String(20), default='Beginner')
    category = db.Column(db.String(50))
    is_active = db.Column(db.Boolean, default=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'trainer_id': self.trainer_id,
            'start_time': self.start_time.isoformat() if self.start_time else None,
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'max_capacity': self.max_capacity,
            'current_bookings': self.current_bookings,
            'price': self.price,
            'difficulty_level': self.difficulty_level,
            'category': self.category,
            'is_active': self.is_active
        }

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('gym_class.id'), nullable=False)
    booking_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='confirmed')
    notes = db.Column(db.Text)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'class_id': self.class_id,
            'booking_date': self.booking_date.isoformat() if self.booking_date else None,
            'status': self.status,
            'notes': self.notes
        }

class UserProfile(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        return user.to_dict(), 200

class Trainers(Resource):
    def get(self):
        trainers = [trainer.to_dict() for trainer in Trainer.query.all()]
        return trainers, 200

class Classes(Resource):
    def get(self):
        classes = [cls.to_dict() for cls in GymClass.query.all()]
        return classes, 200

class Bookings(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        bookings = [booking.to_dict() for booking in Booking.query.filter_by(user_id=user_id).all()]
        return bookings, 200
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()
        
        booking = Booking(
            user_id=user_id,
            class_id=data['class_id']
        )
        
        db.session.add(booking)
        db.session.commit()
        
        return {'message': 'Booking created'}, 201

@app.route('/favicon.ico')
def favicon():
    return '', 204

def seed_data():
    # Create sample trainers
    trainer1 = Trainer(
        name='Mike Johnson',
        bio='Certified personal trainer with 8 years of experience in strength training.',
        specialization='Strength Training',
        phone_number='1234567890',
        email='mike@gym.com',
        experience_years=8,
        hourly_rate=75.0
    )
    
    trainer2 = Trainer(
        name='Sarah Wilson',
        bio='Yoga instructor and wellness coach specializing in mindfulness.',
        specialization='Yoga',
        phone_number='0987654321',
        email='sarah@gym.com',
        experience_years=5,
        hourly_rate=60.0
    )
    
    db.session.add_all([trainer1, trainer2])
    db.session.commit()
    
    # Create sample classes
    from datetime import timedelta
    now = datetime.now()
    
    class1 = GymClass(
        name='Morning Strength Training',
        description='Build muscle and increase strength with compound movements.',
        trainer_id=trainer1.id,
        start_time=now + timedelta(days=1, hours=8),
        end_time=now + timedelta(days=1, hours=9),
        max_capacity=15,
        price=25.0,
        difficulty_level='Intermediate',
        category='Strength'
    )
    
    class2 = GymClass(
        name='Sunrise Yoga',
        description='Start your day with peaceful yoga flow and meditation.',
        trainer_id=trainer2.id,
        start_time=now + timedelta(days=1, hours=7),
        end_time=now + timedelta(days=1, hours=8),
        max_capacity=20,
        price=20.0,
        difficulty_level='Beginner',
        category='Yoga'
    )
    
    db.session.add_all([class1, class2])
    db.session.commit()

api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(UserProfile, '/profile')
api.add_resource(Trainers, '/trainers')
api.add_resource(Classes, '/classes')
api.add_resource(Bookings, '/bookings')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Seed data if tables are empty
        if Trainer.query.count() == 0:
            seed_data()
            print('Sample data created!')
    
    app.run(debug=True, port=5000)