import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  color: { type: String, default: "#ffffff" },
  columns: { type: [{ type: String }], default: [] },
  ownerId: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

const BoardModel = mongoose.model("Board", BoardSchema);

export const getBoards = (query: Record<string, any>) => BoardModel.find(query);
export const getBoardById = (id: string) => BoardModel.findById(id); // private
export const getBoardsByOwnerId = (ownerId: string) => BoardModel.find({ ownerId });
export const createBoard = (boardData: Record<string, any>) => BoardModel.create(boardData);
export const updateBoardById = (id: string, boardData: Record<string, any>) => BoardModel.findByIdAndUpdate(id, boardData, { new: true });
export const deleteBoardById = (id: string) => BoardModel.findByIdAndDelete(id);
export const updateBoardAddColumn = (boardId: string, columnId: string) =>
  BoardModel.findByIdAndUpdate(boardId, { $addToSet: { columns: columnId } }, { new: true });
