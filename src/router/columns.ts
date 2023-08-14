import express from "express";
import { getColumns, createColumn, updateColumn, deleteColumn } from "../controllers/columns";

export default function (router: express.Router) {
  router.get("/columns/:boardId", getColumns);
  router.post("/columns", createColumn);
  router.patch("/columns/:columnId", updateColumn);
  router.delete("/columns/:columnId", deleteColumn);
}
