import json

def handler(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
        return ('', 204, headers)
    
    if request.method == 'GET':
        classes = [
            {'id': 1, 'name': 'Morning Strength Training', 'category': 'Strength', 'difficulty_level': 'Intermediate', 'trainer_id': 1, 'price': 25.0, 'max_capacity': 15, 'current_bookings': 3, 'description': 'Build muscle with compound movements', 'start_time': '2024-01-15T08:00:00', 'end_time': '2024-01-15T09:00:00'},
            {'id': 2, 'name': 'Power Lifting Basics', 'category': 'Strength', 'difficulty_level': 'Beginner', 'trainer_id': 2, 'price': 30.0, 'max_capacity': 12, 'current_bookings': 5, 'description': 'Learn proper powerlifting techniques', 'start_time': '2024-01-15T10:00:00', 'end_time': '2024-01-15T11:00:00'},
            {'id': 3, 'name': 'Advanced Strength', 'category': 'Strength', 'difficulty_level': 'Advanced', 'trainer_id': 3, 'price': 35.0, 'max_capacity': 10, 'current_bookings': 8, 'description': 'Elite strength training program', 'start_time': '2024-01-15T18:00:00', 'end_time': '2024-01-15T19:00:00'},
            {'id': 4, 'name': 'Sunrise Yoga', 'category': 'Yoga', 'difficulty_level': 'Beginner', 'trainer_id': 4, 'price': 20.0, 'max_capacity': 20, 'current_bookings': 12, 'description': 'Gentle morning yoga flow', 'start_time': '2024-01-15T07:00:00', 'end_time': '2024-01-15T08:00:00'},
            {'id': 5, 'name': 'Vinyasa Flow', 'category': 'Yoga', 'difficulty_level': 'Intermediate', 'trainer_id': 5, 'price': 25.0, 'max_capacity': 18, 'current_bookings': 7, 'description': 'Dynamic flowing yoga sequences', 'start_time': '2024-01-15T17:00:00', 'end_time': '2024-01-15T18:00:00'},
            {'id': 6, 'name': 'Hot Yoga Challenge', 'category': 'Yoga', 'difficulty_level': 'Advanced', 'trainer_id': 6, 'price': 30.0, 'max_capacity': 15, 'current_bookings': 10, 'description': 'Intense heated yoga session', 'start_time': '2024-01-15T19:00:00', 'end_time': '2024-01-15T20:00:00'},
            {'id': 7, 'name': 'Core Pilates', 'category': 'Pilates', 'difficulty_level': 'Beginner', 'trainer_id': 7, 'price': 22.0, 'max_capacity': 16, 'current_bookings': 6, 'description': 'Strengthen your core foundation', 'start_time': '2024-01-15T09:00:00', 'end_time': '2024-01-15T10:00:00'},
            {'id': 8, 'name': 'Reformer Pilates', 'category': 'Pilates', 'difficulty_level': 'Intermediate', 'trainer_id': 8, 'price': 28.0, 'max_capacity': 12, 'current_bookings': 9, 'description': 'Equipment-based Pilates workout', 'start_time': '2024-01-15T16:00:00', 'end_time': '2024-01-15T17:00:00'},
            {'id': 9, 'name': 'Advanced Pilates', 'category': 'Pilates', 'difficulty_level': 'Advanced', 'trainer_id': 9, 'price': 32.0, 'max_capacity': 10, 'current_bookings': 4, 'description': 'Challenge your Pilates skills', 'start_time': '2024-01-15T20:00:00', 'end_time': '2024-01-15T21:00:00'},
            {'id': 10, 'name': 'HIIT Bootcamp', 'category': 'HIIT', 'difficulty_level': 'Intermediate', 'trainer_id': 10, 'price': 28.0, 'max_capacity': 14, 'current_bookings': 11, 'description': 'High-intensity interval training', 'start_time': '2024-01-15T18:00:00', 'end_time': '2024-01-15T19:00:00'},
            {'id': 11, 'name': 'Beginner HIIT', 'category': 'HIIT', 'difficulty_level': 'Beginner', 'trainer_id': 11, 'price': 25.0, 'max_capacity': 16, 'current_bookings': 8, 'description': 'Introduction to HIIT training', 'start_time': '2024-01-15T11:00:00', 'end_time': '2024-01-15T12:00:00'},
            {'id': 12, 'name': 'Extreme HIIT', 'category': 'HIIT', 'difficulty_level': 'Advanced', 'trainer_id': 12, 'price': 35.0, 'max_capacity': 12, 'current_bookings': 7, 'description': 'Ultimate HIIT challenge', 'start_time': '2024-01-15T19:00:00', 'end_time': '2024-01-15T20:00:00'}
        ]
        
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
        
        return (json.dumps(classes), 200, headers)
    
    return ('Method not allowed', 405)