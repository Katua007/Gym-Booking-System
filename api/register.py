from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash
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
            
            # Simple response for now
            response_data = {'message': 'User registered successfully'}
            
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
            
            return (json.dumps(response_data), 201, headers)
            
        except Exception as e:
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
            return (json.dumps({'message': str(e)}), 500, headers)
    
    return ('Method not allowed', 405)