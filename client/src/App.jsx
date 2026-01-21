import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

function App() {
  // 🔹 Initialisation du state depuis localStorage dès le premier rendu
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 🔹 Fonction de login
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // 🔹 Fonction de logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Route racine : redirige selon login */}
        <Route
          path="/"
          element={user ? <Navigate to="/tasks" /> : <Navigate to="/login" />}
        />

        {/* Page Login */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Page Tasks protégée */}
        <Route
          path="/tasks"
          element={user ? <Tasks user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />

        {/* Page non trouvée */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
