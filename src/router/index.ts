import express from "express";
import authentication from "./authentication";
import users from "./users";
import boards from "./boards";

const router = express.Router();

export default function (): express.Router {
  authentication(router);
  users(router);
  boards(router);

  return router;
}
