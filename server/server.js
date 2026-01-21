import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import tasksRoutes from "./routes/tasks.js";
import { db } from "./db.js"; // ⚡️ Assure la connexion à la BDD

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

// Test route simple
app.get("/", (req, res) => res.send("API Express fonctionne ✅"));

// Démarrage serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend lancé sur http://localhost:${PORT}`);
});
