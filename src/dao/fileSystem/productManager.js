import fs from "fs";

let products = [];
const pathFile = "../data/products.json";

const getProducts = async (limit) => {
  const productsFs = await fs.promises.readFile(pathFile, "utf-8");
  const productsParse = await JSON.parse(productsFs);
  products = productsParse || [];

  if (!limit) return products;

  return products.slice(0, limit);
};

const addProduct = async (product) => {
  await getProducts();
  const { title, description, price, thumbnail, code, stock, category } =
    product;
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail:
      thumbnail ||
      "https://img.freepik.com/vector-premium/estilo-ilustracion-vectorial-canasta_717774-48288.jpg",
    code,
    stock,
    category,
    status: true,
  };

  products.push(newProduct);

  await fs.promises.writeFile(pathFile, JSON.stringify(products));

  return product;
};

const getProductById = async (id) => {
  products = await getProducts();
  const product = products.find((prod) => prod.id === id);

  return product;
};

const updateProducts = async (id, productData) => {
  await getProducts();

  const index = products.findIndex((prod) => prod.id === id);
  products[index] = {
    ...products[index],
    ...productData,
  };

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
  const productFs = await getProductById(id);
  return productFs;
};

const deleteProducts = async (id) => {
  await getProducts();

  const product = await getProductById(id);
  if (!product) return false;

  products = products.filter((prod) => prod.id !== id);

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
  return true;
};

export default {
  addProduct,
  getProducts,
  getProductById,
  updateProducts,
  deleteProducts,
};
