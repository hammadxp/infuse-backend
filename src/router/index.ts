import express from "express";
import authentication from "./authentication";
import users from "./users";
import boards from "./boards";
import columns from "./columns";
import tasks from "./tasks";

const router = express.Router();

export default function (): express.Router {
  authentication(router);
  users(router);
  boards(router);
  columns(router);
  tasks(router);

  return router;
}
