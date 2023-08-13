import express from "express";
import { get } from "lodash";
import { getBoardById } from "../db/boards";

export async function isOwner(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { boardId } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    const board = await getBoardById(boardId);

    if (!board) {
      return res.status(404).send("Board not found.");
    }

    if (currentUserId.toString() !== board.ownerId) {
      return res.status(403).send("You are not the owner of this board.");
    }

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}
