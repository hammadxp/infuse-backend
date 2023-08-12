import express from "express";
import { isAuthenticated } from "../middlewares";
import { createBoard } from "../controllers/boards";

export default function (router: express.Router) {
  router.post("/boards", isAuthenticated, createBoard);
}
