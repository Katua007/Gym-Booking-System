import json

def handler(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
        return ('', 204, headers)
    
    if request.method == 'GET':
        bookings = [
            {'id': 1, 'user_id': 1, 'class_id': 1, 'booking_date': '2024-01-14T10:00:00', 'status': 'confirmed'},
            {'id': 2, 'user_id': 1, 'class_id': 4, 'booking_date': '2024-01-13T15:30:00', 'status': 'confirmed'},
            {'id': 3, 'user_id': 1, 'class_id': 7, 'booking_date': '2024-01-12T09:15:00', 'status': 'completed'}
        ]
        
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
        
        return (json.dumps(bookings), 200, headers)
    
    if request.method == 'POST':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
        
        return (json.dumps({'message': 'Booking created successfully'}), 201, headers)
    
    return ('Method not allowed', 405)