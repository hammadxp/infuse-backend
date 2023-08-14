import express from "express";
import * as dbTags from "../db/tags";

export async function getTags(req: express.Request, res: express.Response) {
  try {
    const { taskId } = req.params;

    const tags = await dbTags.getTagsByTaskId(taskId);

    return res.status(200).json(tags);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function createTag(req: express.Request, res: express.Response) {
  try {
    const tagData = req.body;

    const newTag = await dbTags.createTag(tagData);

    return res.status(201).json(newTag);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function updateTag(req: express.Request, res: express.Response) {
  try {
    const { tagId } = req.params;
    const tagData = req.body;

    const updatedTag = await dbTags.updateTagById(tagId, tagData);

    return res.status(200).json(updatedTag);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function deleteTag(req: express.Request, res: express.Response) {
  try {
    const { tagId } = req.params;

    const deletedTag = await dbTags.deleteTagById(tagId);

    return res.status(200).json(deletedTag);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}
