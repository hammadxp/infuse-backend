import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/tasks";

export default function (router: express.Router) {
  router.get("/tasks/:columnId", getTasks);
  router.post("/tasks", createTask);
  router.patch("/tasks/:taskId", updateTask);
  router.delete("/tasks/:taskId", deleteTask);
}
