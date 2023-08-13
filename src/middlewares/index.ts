import express from "express";
import { getUserBySessionToken } from "../db/users";
import { get, merge } from "lodash";

export async function isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const sessionToken = req.cookies["INFUSE-PROJECT"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
      return res.sendStatus(403);
    }

    merge(req, { identity: user });

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function isSignedIn(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId.toString()) {
      return res.status(403).send("Unauthorized user");
    }

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}
