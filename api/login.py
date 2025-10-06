from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

def handler(request):
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
        return ('', 204, headers)
    
    if request.method == 'POST':
        try:
            data = request.get_json()
            
            # Simple mock login
            if data.get('username') == 'admin' and data.get('password') == 'admin123':
                response_data = {
                    'access_token': 'mock-token-123',
                    'user': {
                        'id': 1,
                        'username': 'admin',
                        'first_name': 'Admin',
                        'last_name': 'User',
                        'role': 'admin'
                    }
                }
                
                headers = {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
                
                return (json.dumps(response_data), 200, headers)
            else:
                headers = {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
                return (json.dumps({'message': 'Invalid credentials'}), 401, headers)
            
        except Exception as e:
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
            return (json.dumps({'message': str(e)}), 500, headers)
    
    return ('Method not allowed', 405)