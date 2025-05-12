import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import VotingPage from './pages/VotingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import NominationsPage from './pages/NominationsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/nominations" element={<NominationsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;