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

const addProductToCart = async (cid, product) => {
  const cart = await getCartById(cid);

  const productInCart = cart.products.find(
    (p) => p.productId.toString() == product._id.toString()
  );
  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.products.push({
      productId: product._id,
      quantity: 1,
    });
  }

  await cart.save();

  return cart;
};

export { getAllCarts, getCartById, deleteCart, createCarts, addProductToCart };
