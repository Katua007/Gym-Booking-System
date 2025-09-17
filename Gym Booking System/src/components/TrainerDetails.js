import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function TrainerDetails() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/get_trainer_by_id/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Trainer not found');
        }
        return response.json();
      })
      .then(data => {
        setTrainer(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch trainer details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading details...</div>;
  }

  if (!trainer) {
    return <div>Trainer not found.</div>;
  }

  return (
    <div>
      <h2>Trainer Details</h2>
      <p><strong>Name:</strong> {trainer.name}</p>
      <p><strong>Bio:</strong> {trainer.bio}</p>
      <p><strong>Specialization:</strong> {trainer.specialization}</p>
      <p><strong>Phone:</strong> {trainer.phone_number}</p>
      <Link to={`/trainers/edit/${trainer.id}`}>
        <button>Edit Trainer</button>
      </Link>
    </div>
  );
}

export default TrainerDetails;