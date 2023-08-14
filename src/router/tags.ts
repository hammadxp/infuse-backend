import express from "express";
import { getTags, createTag, updateTag, deleteTag } from "../controllers/tags";

export default function (router: express.Router) {
  router.get("/tags/:taskId", getTags);
  router.post("/tags", createTag);
  router.patch("/tags/:tagId", updateTag);
  router.delete("/tags/:tagId", deleteTag);
}
