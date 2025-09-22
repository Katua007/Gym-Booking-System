function TrainerDeleteButton({ trainerId, onDelete }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      fetch(`/get_trainer_by_id/${trainerId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete trainer');
          }
          alert('Trainer deleted successfully!');
          if (onDelete) {
            onDelete(); // Trigger a re-fetch or a redirect in the parent component
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Failed to delete trainer.');
        });
    }
  };

  return (
    <button onClick={handleDelete} style={{ color: 'red' }}>
      Delete
    </button>
  );
}

export default TrainerDeleteButton;