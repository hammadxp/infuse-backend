import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  authentication: {
    encryptedPassword: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const createUser = (data: Record<string, any>) => UserModel.create(data);
export const updateUserById = (id: string, data: Record<string, any>) => UserModel.findByIdAndUpdate(id, data, { new: true });
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);
