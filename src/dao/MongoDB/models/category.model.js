import mongoose from "mongoose";

const categoryCollection = "categorys";

const catergorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const categoryModel = mongoose.model(
  categoryCollection,
  catergorySchema
);
