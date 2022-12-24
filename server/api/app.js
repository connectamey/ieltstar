import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";

// Load the environment variables
dotenv.config();

// Create the app
const app = express();

//Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Pass the app to the routes
routes(app);

// Connect to the database
try {
  console.log("Connecting to the database...");
  await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
  console.log("Successfully connected to MongoDB");
} catch (e) {
  console.log("Error connecting to database : ", e);
}

export default app;
