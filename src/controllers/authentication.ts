import express from "express";
import { getUserByEmail, createUser, updateUserById } from "../db/users";
import { generateRandomString, encryptString } from "../helpers/authentication";

export async function signUp(req: express.Request, res: express.Response) {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).send("Please provide all credientials.");
    }

    const user = await getUserByEmail(email);
    if (user) {
      return res.send(400).send("Can't sign up because the user already exists.");
    }

    const salt = generateRandomString();
    const encryptedPassword = encryptString(password, salt);

    const userDoc = await createUser({
      email,
      fullName,
      authentication: {
        encryptedPassword,
        salt,
      },
    });

    return res.status(200).json(userDoc);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function signIn(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Wrong credientials");
    }

    const user = await getUserByEmail(email).select("+authentication.encryptedPassword +authentication.salt");
    if (!user) {
      return res.status(400).send("User does not exist, please sign up first.");
    }

    const encryptedPasswordAgain = encryptString(password, user.authentication.salt);

    if (encryptedPasswordAgain !== user.authentication.encryptedPassword) {
      return res.status(403).send("Wrong password");
    }

    // sign in user
    const salt = generateRandomString();
    const sessionToken = encryptString(user._id.toString(), salt);

    // user.authentication.sessionToken = sessionToken;
    // await user.save();
    // res.cookie("INFUSE-PROJECT", user.authentication.sessionToken, { domain: "localhost", path: "/" });

    const updatedUser = await updateUserById(user._id.toString(), { $set: { "authentication.sessionToken": sessionToken } });

    res.cookie("INFUSE-PROJECT", sessionToken, { domain: "localhost", path: "/" });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}
