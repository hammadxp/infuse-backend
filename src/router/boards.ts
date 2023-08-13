import express from "express";
import { isAuthenticated } from "../middlewares";
import { isOwner } from "../middlewares/boards";
import { getBoards, createBoard, updateBoard, deleteBoard } from "../controllers/boards";

export default function (router: express.Router) {
  router.get("/boards", isAuthenticated, getBoards);
  router.post("/boards", isAuthenticated, createBoard);
  router.patch("/boards/:boardId", isAuthenticated, isOwner, updateBoard);
  router.delete("/boards/:boardId", isAuthenticated, isOwner, deleteBoard);
}
