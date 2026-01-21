import request from "supertest";
import app from "../app.js"; // ton app Express
import { db } from "../db.js";

describe("Tests API /api/tasks", () => {
  let taskId; // id de la tâche temporaire pour le test GET


  beforeAll(async () => {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
        ["Tâche test Jest", 1],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });
    taskId = result.insertId;
  });


  afterAll(async () => {
    await new Promise((resolve) => {
      db.query("DELETE FROM tasks WHERE id = ?", [taskId], resolve);
    });
    db.end();
  });

 
  it("GET /api/tasks?user_id=1 → retourne les tâches de l'utilisateur", async () => {
    const res = await request(app).get("/api/tasks").query({ user_id: 1 });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("title");
    expect(res.body[0]).toHaveProperty("user_id", 1);
  });


  it("GET /api/tasks sans user_id → retourne 400", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "user_id manquant" });
  });


  it("POST /api/tasks → ajoute une tâche", async () => {
    const newTask = { title: "Nouvelle tâche Jest", user_id: 1 };

    const res = await request(app).post("/api/tasks").send(newTask);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe(newTask.title);

    await new Promise((resolve) => {
      db.query("DELETE FROM tasks WHERE id = ?", [res.body.id], resolve);
    });
  });
});
