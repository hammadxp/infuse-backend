import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  title: { type: String, required: true },
  color: { type: String },
  taskId: { type: String, required: true },
});

const TagModel = mongoose.model("Tag", TagSchema);

export const getTags = () => TagModel.find();
export const getTagById = (id: string) => TagModel.findById(id);
export const getTagsByTaskId = (taskId: string) => TagModel.find({ taskId });
export const createTag = (tagData: Record<string, any>) => TagModel.create(tagData);
export const updateTagById = (id: string, tagData: Record<string, any>) => TagModel.findByIdAndUpdate(id, tagData, { new: true });
export const deleteTagById = (id: string) => TagModel.findByIdAndDelete(id);
