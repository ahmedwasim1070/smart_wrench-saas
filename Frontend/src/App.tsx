// Imports
import { Routes, Route } from "react-router-dom";
//
import Home from "./pages/Home";
import Login from "./pages/Login";

//
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<div>Dashboard (Protected)</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
}

export default App;
