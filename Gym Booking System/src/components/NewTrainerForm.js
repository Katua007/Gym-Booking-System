import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewTrainerForm() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTrainer = {
      name,
      bio,
      specialization,
      phone_number: phoneNumber,
    };

    console.log("Sending data:", newTrainer); // Debugging line

    fetch('/trainers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrainer),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create trainer');
        }
        return response.json();
      })
      .then(() => {
        alert('Trainer created successfully!');
        navigate('/'); // Redirect to the trainers list
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to create trainer. Please check your input.');
      });
  };

  return (
    <div>
      <h2>Add a New Trainer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
        </label>
        <label>
          Specialization:
          <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
        </label>
        <label>
          Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </label>
        <button type="submit">Create Trainer</button>
      </form>
    </div>
  );
}

export default NewTrainerForm;