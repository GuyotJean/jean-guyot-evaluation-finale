import mysql from "mysql2";
import dotenv from "dotenv";

// Charge le bon fichier .env selon l'environnement
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306, // Ajouter le port par défaut si non défini
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connexion à MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Erreur connexion MySQL :", err);
  } else {
    console.log("✅ Connecté à MySQL");
  }
});
