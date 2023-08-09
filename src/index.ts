import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { Promise } from "mongoose";
import router from "./router/index";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(
  cors({
    credentials: true,
  })
);
app.use("/", router());

app.listen(5000, () => console.log("Server is running on http://localhost:5000"));

const mongodbUri = process.env.MONGODB_URI;

mongoose.Promise = Promise;
mongoose.connect(mongodbUri, { dbName: "infuse-project" });
mongoose.connection.on("connected", () => console.log("Connected to MongoDB Atlas"));
mongoose.connection.on("error", (err: Error) => console.log(err));
