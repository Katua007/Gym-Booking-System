import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TrainerDeleteButton from './TrainerDeleteButton';

function TrainersList() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/trainers')
      .then(response => response.json())
      .then(data => {
        setTrainers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch trainers:", error);
        setTrainers([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading trainers...</div>;
  }

  return (
    <div>
      <h2>All Trainers</h2>
      <ul>
        {trainers.map(trainer => (
          <li key={trainer.id}>
            <Link to={`/trainers/${trainer.id}`}>
              <strong>{trainer.name}</strong> - {trainer.specialization}
            </Link>
            <Link to={`/trainers/edit/${trainer.id}`}>
              <button>Edit</button>
            </Link>
            <TrainerDeleteButton trainerId={trainer.id} onDelete={() => window.location.reload()} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainersList;