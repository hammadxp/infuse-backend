import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/users";
import { isAuthenticated } from "../middlewares";
import { isOwner } from "../middlewares/users";

export default function (router: express.Router) {
  router.get("/users", isAuthenticated, getUsers);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
}
