import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TrainersList from './components/TrainersList';
import NewTrainerForm from './components/NewTrainerForm';
import TrainerDetails from './components/TrainerDetails';
import TrainerUpdateForm from './components/TrainerUpdateForm';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Gym App</h1>
          <nav>
            <Link to="/">All Trainers</Link> | <Link to="/new">Add Trainer</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TrainersList />} />
            <Route path="/new" element={<NewTrainerForm />} />
            <Route path="/trainers/:id" element={<TrainerDetails />} />
            <Route path="/trainers/edit/:id" element={<TrainerUpdateForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;