import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<div className="p-8 text-2xl font-bold text-gray-800">Dashboard (Protected)</div>} />
      <Route path="/login" element={<div className="p-8 text-2xl font-bold text-gray-800">Login Page</div>} />
      <Route path="*" element={<div className="p-8 text-2xl font-bold text-red-600">404 - Not Found</div>} />
    </Routes>
  );
}

export default App;
