// Imports
import { Routes, Route } from "react-router-dom";
//
import Home from "./features/home/pages/Home";
import Login from "./features/auth/pages/Login";

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
