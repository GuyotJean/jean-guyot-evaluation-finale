import axios from "axios";

export const api = axios.create({
  baseURL: "https://jean-guyot-evaluation-finale.onrender.com/api",
});
