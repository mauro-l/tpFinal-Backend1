import { Router } from "express";
import {
  getAllCarts,
  getCartById,
  deleteCart,
  createCarts,
  addProductToCart,
} from "../dao/MongoDB/cart.dao.js";
import productDao from "../dao/MongoDB/product.dao.js";
import { cartModel } from "../dao/MongoDB/models/cart.model.js";
import checkCart from "../middlewares/checkCart.middleware.js";

const router = Router();

//Crear carrito
router.post("/", async (req, res) => {
  try {
    const cart = await createCarts();

    res.status(201).json({ status: "success", cart });
  } catch (err) {
    console.error("Error creating cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Obtener todos los carritos
router.get("/", async (req, res) => {
  try {
    const carts = await getAllCarts();

    res.status(200).json({ status: "success", carts });
  } catch (err) {
    console.error("Error getting carts", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Obtener carrito por id
router.get("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    const cart = await getCartById(id);
    if (!cart)
      return res.status(404).json({ status: "Error", msg: "Cart Not Found" });

    res.status(200).json({ status: "success", cart });
  } catch (err) {
    console.error("Error getting carts", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Agregar un producto por ID a un carrito
router.post("/:cid/product/:pid", checkCart, async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const product = await productDao.getProductsById(pid);
    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: "Product Not Found" });

    const carts = await getCartById(cid);
    if (!carts)
      return res.status(404).json({ status: "Error", msg: "Cart Not Found" });

    const cart = await addProductToCart(cid, product);
    res.status(201).json({ status: "success", payload: cart });
  } catch (err) {
    console.error("Error added product in the cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Eliminar carrito
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await deleteCart(cid);

    if (!cart)
      return res.status(404).json({ status: "Error", msg: "Cart Not Found" });

    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    console.error("Error creating cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

export default router;
