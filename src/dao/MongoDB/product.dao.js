import { productModel } from "./models/products.model.js";

const getAllProducts = async (query, options) => {
  const products = await productModel.paginate(query, options);

  return products;
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
