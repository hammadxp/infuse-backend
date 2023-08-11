import express from "express";
import * as dbUsers from "../db/users";

export async function getUsers(req: express.Request, res: express.Response) {
  try {
    const users = await dbUsers.getUsers();

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function updateUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const data = req.body;

    console.log(id);
    console.log(data);

    const user = await dbUsers.getUserById(id);
    if (!user) {
      return res.status(400).send("Can't update the user because the user does not exist.");
    }

    console.log("this user", user);

    // for (let key in data) {
    //   if ((user as User[key]) && user[key] === data[key]) {
    //     console.log("mf");
    //   }
    // }

    const updatedUser = await dbUsers.updateUserById(id, { $set: data });
    // return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function deleteUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;

    const deletedUser = await dbUsers.deleteUserById(id);

    return res.status(200).json(deletedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}
