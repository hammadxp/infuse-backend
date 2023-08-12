import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  color: { type: String, default: "#ffffff" },,
  position: { type: Number },
  boardId: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

const ColumnModel = mongoose.model("Column", ColumnSchema);

export const getColumns = () => ColumnModel.find(); // private
export const getColumnsByBoardId = (boardId: string) => ColumnModel.find({ boardId });
export const getColumnById = (id: string) => ColumnModel.findById(id); // private
export const createColumn = (columnData: Record<string, any>) => ColumnModel.create(columnData);
export const updateColumnById = (id: string, columnData: Record<string, any>) => ColumnModel.findByIdAndUpdate(id, columnData, { new: true });
export const deleteColumnById = (id: string) => ColumnModel.findByIdAndDelete(id);
