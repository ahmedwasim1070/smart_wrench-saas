// Imports
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// Providers
import { ThemeProvider } from "./providers/ThemeProvider";

//
function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<div>Dashboard (Protected)</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
