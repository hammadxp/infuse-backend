import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  // tags: { type: [{ type: String }], default: [] },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
  columnId: { type: String, required: true },
});

const TaskModel = mongoose.model("Task", TaskSchema);

export const getTasks = () => TaskModel.find();
export const getTaskById = (id: string) => TaskModel.findById(id);
export const getTasksByColumnId = (columnId: string) => TaskModel.find({ columnId });
export const createTask = (taskData: Record<string, any>) => TaskModel.create(taskData);
export const updateTaskById = (id: string, taskData: Record<string, any>) => TaskModel.findByIdAndUpdate(id, taskData, { new: true });
export const deleteTaskById = (id: string) => TaskModel.findByIdAndDelete(id);
