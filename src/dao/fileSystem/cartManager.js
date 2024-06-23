import fs from "fs";

let carts = [];
const pathFile = "../data/cart.json";

const getCarts = async () => {
  const cartJson = await fs.promises.readFile(pathFile, "utf-8");
  const cartFs = JSON.parse(cartJson);
  carts = cartFs || [];

  return carts;
};

const createCarts = async () => {
  await getCarts();
  const newCart = {
    id: carts.length + 1,
    products: [],
  };

  carts.push(newCart);
  await fs.promises.writeFile(pathFile, JSON.stringify(carts));

  return carts;
};

const getCartById = async (cid) => {
  await getCarts();
  const cartFs = carts.find((cart) => cart.id === cid);
  console.log(cartFs);
  return cartFs;
};

const addProductToCart = async (cid, pid) => {
  await getCarts();
  const product = {
    product: pid,
    quantity: 1,
  };

  const index = carts.findIndex((cart) => cart.id === cid);
  if (index === -1) return carts[index];

  const productInCart = carts[index].products.find(
    (prod) => prod.product === pid
  );

  if (productInCart) {
    productInCart.quantity = productInCart.quantity + 1;
  } else {
    carts[index].products.push(product);
  }

  await fs.promises.writeFile(pathFile, JSON.stringify(carts));

  console.log(carts[index]);
  return carts[index];
};

export { getCarts, getCartById, addProductToCart, createCarts };
