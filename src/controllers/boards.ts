import express from "express";
import * as dbBoards from "../db/boards";
import { get } from "lodash";

export async function createBoard(req: express.Request, res: express.Response) {
  try {
    const { title } = req.body;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.status(403).send("Unauthorized user");
    }

    const newBoard = await dbBoards.createBoard({
      title,
      ownerId: currentUserId.toString(),
    });

    return res.status(200).json(newBoard);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}
