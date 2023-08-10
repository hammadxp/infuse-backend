import express from "express";
import { signUp, signIn } from "../controllers/authentication";

export default function (router: express.Router) {
  router.post("/auth/sign-up", signUp);
  router.post("/auth/sign-in", signIn);
}
