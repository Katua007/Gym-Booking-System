from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        trainers = [
            {'id': 1, 'name': 'Mike Johnson', 'specialization': 'Strength Training', 'experience_years': 8, 'hourly_rate': 75.0, 'bio': 'Certified personal trainer with 8 years of experience in strength training and bodybuilding.', 'phone_number': '1234567890', 'email': 'mike@gym.com', 'is_available': True},
            {'id': 2, 'name': 'Alex Rodriguez', 'specialization': 'Strength Training', 'experience_years': 5, 'hourly_rate': 65.0, 'bio': 'Former competitive powerlifter specializing in compound movements.', 'phone_number': '2345678901', 'email': 'alex@gym.com', 'is_available': True},
            {'id': 3, 'name': 'Marcus Thompson', 'specialization': 'Strength Training', 'experience_years': 12, 'hourly_rate': 85.0, 'bio': 'Elite strength coach with Olympic lifting expertise.', 'phone_number': '3456789012', 'email': 'marcus@gym.com', 'is_available': True},
            {'id': 4, 'name': 'Sarah Wilson', 'specialization': 'Yoga', 'experience_years': 6, 'hourly_rate': 60.0, 'bio': 'Yoga instructor and wellness coach specializing in mindfulness and flexibility.', 'phone_number': '4567890123', 'email': 'sarah@gym.com', 'is_available': True},
            {'id': 5, 'name': 'Emma Chen', 'specialization': 'Yoga', 'experience_years': 4, 'hourly_rate': 55.0, 'bio': 'Hatha and Vinyasa yoga specialist with meditation training.', 'phone_number': '5678901234', 'email': 'emma@gym.com', 'is_available': True},
            {'id': 6, 'name': 'Priya Patel', 'specialization': 'Yoga', 'experience_years': 10, 'hourly_rate': 70.0, 'bio': 'Advanced yoga practitioner with hot yoga and aerial yoga certifications.', 'phone_number': '6789012345', 'email': 'priya@gym.com', 'is_available': True},
            {'id': 7, 'name': 'Lisa Martinez', 'specialization': 'Pilates', 'experience_years': 7, 'hourly_rate': 65.0, 'bio': 'Classical Pilates instructor with rehabilitation background.', 'phone_number': '7890123456', 'email': 'lisa@gym.com', 'is_available': True},
            {'id': 8, 'name': 'Jessica Brown', 'specialization': 'Pilates', 'experience_years': 5, 'hourly_rate': 60.0, 'bio': 'Reformer Pilates specialist focusing on core strength and flexibility.', 'phone_number': '8901234567', 'email': 'jessica@gym.com', 'is_available': True},
            {'id': 9, 'name': 'Amanda Taylor', 'specialization': 'Pilates', 'experience_years': 9, 'hourly_rate': 75.0, 'bio': 'Master Pilates trainer with advanced certification in therapeutic Pilates.', 'phone_number': '9012345678', 'email': 'amanda@gym.com', 'is_available': True},
            {'id': 10, 'name': 'David Kim', 'specialization': 'HIIT', 'experience_years': 6, 'hourly_rate': 70.0, 'bio': 'High-intensity interval training specialist and former athlete.', 'phone_number': '0123456789', 'email': 'david@gym.com', 'is_available': True},
            {'id': 11, 'name': 'Ryan Foster', 'specialization': 'HIIT', 'experience_years': 4, 'hourly_rate': 60.0, 'bio': 'Functional fitness and HIIT coach with sports performance background.', 'phone_number': '1122334455', 'email': 'ryan@gym.com', 'is_available': True},
            {'id': 12, 'name': 'Carlos Mendez', 'specialization': 'HIIT', 'experience_years': 8, 'hourly_rate': 80.0, 'bio': 'Elite HIIT trainer specializing in metabolic conditioning and fat loss.', 'phone_number': '2233445566', 'email': 'carlos@gym.com', 'is_available': True}
        ]
        
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(trainers).encode())