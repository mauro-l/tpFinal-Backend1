import mongoose from "mongoose";
import dotenv from "dotenv";
//import { seedUserToDB } from "../seed/seedProducts.js";

dotenv.config();

export const connectMongoDB = async () => {
  try {
    const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;
    const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

    mongoose.connect(uri);
    console.log("MongoDB connected 🌱");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
