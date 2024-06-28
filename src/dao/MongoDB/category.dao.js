import { categoryModel } from "./models/category.model.js";

const getAllCategory = async (query) => {
  const categories = await categoryModel.find(query);
  return categories;
};

const createCategory = async (body) => {
  const categories = await categoryModel.create(body);
  return categories;
};

const getCategoryById = async (id) => {
  const categories = categoryModel.findById(id);

  return categories;
};

const updateCategory = async (id, data) => {
  const categoriesUpdate = await categoryModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return categoriesUpdate;
};

const deleteCategory = async (id) => {
  const categories = await categoryModel.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  return categories;
};

export default {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
