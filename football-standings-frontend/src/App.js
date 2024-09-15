import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LeaguePage from './pages/LeaguePage';
import SeasonPage from './pages/SeasonPage';
import StandingsPage from './pages/StandingsPage';
import './styles/styles.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/league/:leagueId" element={<LeaguePage />} />
        <Route path="/league/:leagueId/seasons" element={<SeasonPage />} />
        <Route path="/league/:leagueId/standings" element={<StandingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
