import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import tasksRoutes from "./routes/tasks.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

export default app; 
