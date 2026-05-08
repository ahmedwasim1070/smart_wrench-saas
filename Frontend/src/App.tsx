// Imports
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

//
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<div>Dashboard (Protected)</div>} />
      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
}

export default App;
