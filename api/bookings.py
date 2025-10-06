from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        bookings = [
            {'id': 1, 'user_id': 1, 'class_id': 1, 'booking_date': '2024-01-14T10:00:00', 'status': 'confirmed'},
            {'id': 2, 'user_id': 1, 'class_id': 4, 'booking_date': '2024-01-13T15:30:00', 'status': 'confirmed'},
            {'id': 3, 'user_id': 1, 'class_id': 7, 'booking_date': '2024-01-12T09:15:00', 'status': 'completed'}
        ]
        
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(bookings).encode())

    def do_POST(self):
        self.send_response(201)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'message': 'Booking created successfully'}).encode())