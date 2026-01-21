import { useState, useEffect } from "react";
import { api } from "../api";

export default function Tasks({ user }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    if (!user?.id) return; // sécurité si user pas encore chargé
    try {
      const res = await api.get("/tasks", { params: { user_id: user.id } });
      setTasks(res.data);
    } catch (err) {
      console.error("Erreur fetch tasks:", err);
    }
  };

  const addTask = async () => {
    if (!title || !user?.id) return;
    try {
      await api.post("/tasks", { title, user_id: user.id });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Erreur add task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]); // refait fetch si user change

  return (
    <div>
      <h1 data-cy="tasks-title">Tasks: Jean GUYOT</h1>
      <h2 data-cy="tasks-subtitle">Liste des tâches de {user?.email}</h2>

      <input
        data-cy="new-task-input"
        placeholder="Nouvelle tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button data-cy="add-task-btn" onClick={addTask}>
        Ajouter
      </button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id} className="task-item" data-cy="task-item">
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
