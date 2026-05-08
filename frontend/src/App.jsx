import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateBoard from './pages/CreateBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-board" element={<CreateBoard />} />
      </Routes>
    </Router>
  );
}

export default App;