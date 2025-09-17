from flask import Flask, request, make_response, jsonify,json
from flask_migrate import Migrate
from models import db, Trainer
from flask_restful import Resource,Api
from werkzeug.exceptions import HTTPException
from flask_cors import CORS

# add the sqlalchemy database configurtion to our app
# initialize our sqlalchemy instance with our app
# initialize our migrate instance with both our app and our DB
app = Flask(__name__)
CORS(app) # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gym.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
db.init_app(app)
migrate = Migrate(app, db,render_as_batch=True)
api=Api(app)


class Welcome(Resource):
    def get(self):
        resp_body={
            "message":"<h1>Flask App Running Smoothly.....</h1>"
        }
        response = make_response(
            resp_body,
            200
        )
        return response


class Trainers(Resource):
    def get(self):
        trainers = [trainer.to_dict() for trainer in Trainer.query.all()]
        response = make_response(
            trainers,
            200
        )

        return response
            
    def post(self):
        # access trainer data that was sent from client through request
        trainer_data = request.json
        # print(trainer_data)
        # Add this new resource to your database, and ensure it’s saved. i.e create an instance of the trainer class, add it to the session and commit the session
        new_trainer = Trainer(name=trainer_data['name'], bio=trainer_data['bio'], specialization = trainer_data['specialization'], phone_number=trainer_data['phone_number'])
        db.session.add(new_trainer)
        db.session.commit()
        resp = make_response({'success':'Trainer Created'}, 201)
        return resp



class TrainerById(Resource):
    def get(self,id):
        trainer = db.session.query(Trainer).get(id)
        resp = make_response(trainer.to_dict(), 200)
        return resp

    def patch(self,id):
        trainer = db.session.query(Trainer).get(id)
        for attr in request.json:
            setattr(trainer,attr,request.json.get(attr))

        db.session.add(trainer)
        db.session.commit()

        resp_dict = trainer.to_dict()
        response = make_response(
            resp_dict,
            201
        )
        return response

    def delete(self,id):
        trainer = db.session.query(Trainer).get(id)
        db.session.delete(trainer)
        db.session.commit()

        resp_body = {"message":"trainer deleted successfully" }

        response = make_response(
            resp_body,
            200
        )
        return response

@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

# Move trainers list outside the function so it's globally accessible
trainers = [
    {"id": 1, "name": "John Doe", "specialty": "Strength Training"},
    {"id": 2, "name": "Jane Smith", "specialty": "Yoga"},
    {"id": 3, "name": "Peter Jones", "specialty": "Cardio"}
]

@app.route('/api/trainers', methods=['GET'])
def get_trainers():
    return jsonify(trainers)

api.add_resource(Welcome, '/')
api.add_resource(Trainers,'/trainers')
api.add_resource(TrainerById,"/get_trainer_by_id/<int:id>")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

