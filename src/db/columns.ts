import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  color: { type: String },
  position: { type: Number },
  tasks: { type: [{ type: String }], default: [] },
  boardId: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

const ColumnModel = mongoose.model("Column", ColumnSchema);

export const getColumns = () => ColumnModel.find();
export const getColumnById = (id: string) => ColumnModel.findById(id);
export const getColumnsByBoardId = (boardId: string) => ColumnModel.find({ boardId });
export const createColumn = (columnData: Record<string, any>) => ColumnModel.create(columnData);
export const updateColumnById = (id: string, columnData: Record<string, any>) => ColumnModel.findByIdAndUpdate(id, columnData, { new: true });
export const deleteColumnById = (id: string) => ColumnModel.findByIdAndDelete(id);
