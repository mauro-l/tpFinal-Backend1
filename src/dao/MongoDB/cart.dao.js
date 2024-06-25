import { cartModel } from "./models/cart.model.js";

const getAllCarts = async () => {
  const carts = await cartModel.find();
  return carts;
};

const createCarts = async (data) => {
  const carts = await cartModel.create(data);
  return carts;
};

const getCartById = async (cid) => {
  const cart = await cartModel.findById(cid);
  return cart;
};

const deleteCart = async (cid) => {
  const cart = await cartModel.deleteOne({ _id: cid });
  return cart;
};

const addProductToCart = async (cid, pid, quantityAdd) => {
  const cart = await getCartById(cid);

  const productInCart = cart.products.find((p) => p.productId == pid);
  if (productInCart && quantityAdd) {
    productInCart.quantity += quantityAdd;
  } else if (productInCart && !quantityAdd) {
    productInCart.quantity++;
  } else {
    console.log("aca");
    cart.products.push({
      productId: pid,
      quantity: 1,
    });
  }

  await cart.save();

  return cart;
};

const updateQuantityToProduct = async (cid, pid, quantity) => {
  const cart = await getCartById(cid);

  const product = cart.products.find((p) => p.productId == pid);
  product.quantity = quantity;

  await cart.save();
  return cart;
};

const deleteProductToCart = async (cid, pid) => {
  const cart = await getCartById(cid);
  cart.products = cart.products.filter((p) => p.productId != pid);
  await cart.save();

  return cart;
};

const clearProductsToCart = async (cid) => {
  const cart = await getCartById(cid);
  cart.products = [];

  await cart.save();
  return cart;
};

export {
  getAllCarts,
  getCartById,
  deleteCart,
  createCarts,
  addProductToCart,
  deleteProductToCart,
  updateQuantityToProduct,
  clearProductsToCart,
};
