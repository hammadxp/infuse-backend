import express from "express";
import { getUserBySessionToken } from "../db/users";
import { get, merge } from "lodash";

export async function isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const sessionToken = req.cookies["INFUSE-PROJECT"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    console.log(sessionToken);

    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
      console.log("alas again");
      return res.sendStatus(403);
    }

    merge(req, { identity: user });

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function isOwner(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
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
