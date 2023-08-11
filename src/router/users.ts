import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/users";

export default function (router: express.Router) {
  router.get("/users", getUsers);
  router.patch("/users/:id", updateUser);
  router.delete("/users/:id", deleteUser);
}
