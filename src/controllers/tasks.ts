import express from "express";
import * as dbTasks from "../db/tasks";

export async function getTasks(req: express.Request, res: express.Response) {
  try {
    const { columnId } = req.params;

    const tasks = await dbTasks.getTasksByColumnId(columnId);

    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function createTask(req: express.Request, res: express.Response) {
  try {
    const taskData = req.body;

    const newTask = await dbTasks.createTask(taskData);

    return res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function updateTask(req: express.Request, res: express.Response) {
  try {
    const { taskId } = req.params;
    const taskData = req.body;

    const updatedTask = await dbTasks.updateTaskById(taskId, taskData);

    return res.status(200).json(updatedTask);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function deleteTask(req: express.Request, res: express.Response) {
  try {
    const { taskId } = req.params;

    const deletedTask = await dbTasks.deleteTaskById(taskId);

    return res.status(200).json(deletedTask);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}
