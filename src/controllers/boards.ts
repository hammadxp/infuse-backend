import express from "express";
import { get } from "lodash";
import * as dbBoards from "../db/boards";

export async function getBoards(req: express.Request, res: express.Response) {
  try {
    const currentUserId = get(req, "identity._id") as string;

    const boards = await dbBoards.getBoardsByOwner(currentUserId.toString());

    return res.status(200).json(boards);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function createBoard(req: express.Request, res: express.Response) {
  try {
    const { title } = req.body;
    const currentUserId = get(req, "identity._id") as string;

    const newBoard = await dbBoards.createBoard({
      title,
      ownerId: currentUserId.toString(),
    });

    return res.status(201).json(newBoard);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function updateBoard(req: express.Request, res: express.Response) {
  try {
    const { boardId } = req.params;
    const boardData = req.body;

    const updatedBoard = await dbBoards.updateBoardById(boardId, boardData);

    return res.status(200).json(updatedBoard);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function deleteBoard(req: express.Request, res: express.Response) {
  try {
    const { boardId } = req.params;

    const deletedBoard = await dbBoards.deleteBoardById(boardId);

    return res.status(200).json(deletedBoard);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}
