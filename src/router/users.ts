import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/users";

export default function (router: express.Router) {
  router.get("/users", getUsers);
  router.patch("/user/:id", updateUser);
  router.delete("/user/:id", deleteUser);
}
