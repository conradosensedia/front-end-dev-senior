import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateBoard from './pages/CreateBoard';
import KanbanBoard from './pages/KanbanBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-board" element={<CreateBoard />} />
        <Route path="/board/:id" element={<KanbanBoard />} />
      </Routes>
    </Router>
  );
}

export default App;