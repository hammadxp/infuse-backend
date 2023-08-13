import express from "express";
import { get } from "lodash";

export async function isOwner(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId.toString()) {
      return res.sendStatus(403);
    }

    if (id !== currentUserId.toString()) {
      return res.status(403).send("Can't complete requested operation because you are not the owner.");
    }

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}
