import { productModel } from "./models/products.model.js";

const getAllProducts = async (limit) => {
  const products = await productModel.find({ status: true });

  if (!limit) return products;

  return products.slice(0, limit);
};

const createProducts = async (body) => {
  const product = await productModel.create(body);
  return product;
};

const getProductsById = async (id) => {
  const product = productModel.findById(id);

  return product;
};

const updateProducts = async (id, data) => {
  const productsUpdate = await productModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return productsUpdate;
};

const deleteProducts = async (id) => {
  console.log(id);
  const products = await productModel.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  return products;
};

export default {
  createProducts,
  getAllProducts,
  getProductsById,
  updateProducts,
  deleteProducts,
};
