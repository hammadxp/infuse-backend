import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: String },
  tags: [{ type: String }],
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

const TaskModel = mongoose.model("Task", TaskSchema);

export const getTasks = () => TaskModel.find(); // private
export const getTasksByOwner = (ownerId: string) => TaskModel.find({ ownerId });
export const getTasksByMember = (memberId: string) => TaskModel.find({ members: { $in: [memberId] } });
export const getTaskById = (id: string) => TaskModel.findById(id); // private
export const createTask = (boardData: Record<string, any>) => TaskModel.create(boardData);
export const updateTaskById = (id: string, boardData: Record<string, any>) => TaskModel.findByIdAndUpdate(id, boardData, { new: true });
export const deleteTaskById = (id: string) => TaskModel.findByIdAndDelete(id);
