import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TrainerUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainerData, setTrainerData] = useState({
    name: '',
    bio: '',
    specialization: '',
    phone_number: '',
  });

  // Fetch trainer data to pre-populate the form
  useEffect(() => {
    fetch(`/get_trainer_by_id/${id}`)
      .then(response => response.json())
      .then(data => setTrainerData(data))
      .catch(error => console.error("Error fetching trainer for update:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/get_trainer_by_id/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainerData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update trainer');
        }
        return response.json();
      })
      .then(() => {
        alert('Trainer updated successfully!');
        navigate(`/trainers/${id}`); // Redirect to the trainer's details page
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to update trainer.');
      });
  };

  return (
    <div>
      <h2>Edit Trainer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={trainerData.name} onChange={handleChange} required />
        </label>
        <label>
          Bio:
          <textarea name="bio" value={trainerData.bio} onChange={handleChange} required />
        </label>
        <label>
          Specialization:
          <input type="text" name="specialization" value={trainerData.specialization} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phone_number" value={trainerData.phone_number} onChange={handleChange} required />
        </label>
        <button type="submit">Update Trainer</button>
      </form>
    </div>
  );
}

export default TrainerUpdateForm;