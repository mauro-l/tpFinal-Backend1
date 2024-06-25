import mongoose from "mongoose";
//import { seedUserToDB } from "../seed/seedProducts.js";

export const connectMongoDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://admin:19952006Na.@proyectch.sqyor2n.mongodb.net/tp-back1"
    );
    console.log("MongoDB connected 🌱");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
