import express from "express";

export default function (router: express.Router) {
  router.get("/users", () => console.log("Hi"));
}
