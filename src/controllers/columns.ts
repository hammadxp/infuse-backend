import express from "express";
import * as dbColumns from "../db/columns";

export async function getColumns(req: express.Request, res: express.Response) {
  try {
    const { boardId } = req.params;

    const columns = await dbColumns.getColumnsByBoardId(boardId);

    return res.status(200).json(columns);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function createColumn(req: express.Request, res: express.Response) {
  try {
    const columnData = req.body;

    const newColumn = await dbColumns.createColumn(columnData);

    return res.status(201).json(newColumn);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function updateColumn(req: express.Request, res: express.Response) {
  try {
    const { columnId } = req.params;
    const columnData = req.body;

    const updatedColumn = await dbColumns.updateColumnById(columnId, columnData);

    return res.status(200).json(updatedColumn);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function deleteColumn(req: express.Request, res: express.Response) {
  try {
    const { columnId } = req.params;

    const deletedColumn = await dbColumns.deleteColumnById(columnId);

    return res.status(200).json(deletedColumn);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}
