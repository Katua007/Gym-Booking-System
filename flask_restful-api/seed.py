from faker import Faker
from app import app, db
from models import Trainer, Trainee, Session
import random

fake = Faker()

def seed_data():
    with app.app_context():
        # Clear existing data
        Session.query.delete()
        Trainer.query.delete()
        Trainee.query.delete()

        # Create Trainers
        trainers = []
        for _ in range(5):  # generate 5 trainers
            trainer = Trainer(
                name=fake.name(),
                bio=fake.text(max_nb_chars=150),
                specialization=random.choice(["Yoga", "Cardio", "Strength", "Boxing"]),
                phone_number=fake.phone_number()
            )
            trainers.append(trainer)
            db.session.add(trainer)

        # Create Trainees
        trainees = []
        for _ in range(10):  # generate 10 trainees
            trainee = Trainee(
                name=fake.name(),
                email=fake.unique.email(),
                phone_number=fake.phone_number(),
                age=random.randint(18, 50)
            )
            trainees.append(trainee)
            db.session.add(trainee)

        db.session.commit()

        # Create Sessions (link trainers and trainees)
        for _ in range(10):  # 10 sessions
            session = Session(
                day=random.choice(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]),
                activity=random.choice(["Running", "Cycling", "Weight Lifting", "Meditation"]),
                trainer=random.choice(trainers),
                trainee=random.choice(trainees)
            )
            db.session.add(session)

        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()