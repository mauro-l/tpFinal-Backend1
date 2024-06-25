import { Router } from "express";
import {
  getAllCarts,
  getCartById,
  deleteCart,
  createCarts,
  addProductToCart,
  deleteProductToCart,
  updateQuantityToProduct,
  clearProductsToCart,
} from "../dao/MongoDB/cart.dao.js";
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
    const { quantity } = req.body; //en caso de que se mande una cantidad mayor a 1 esta sera mediante el body

    const quantityAdd = quantity ? Number(quantity) : null;

    const cart = await addProductToCart(cid, pid, quantityAdd);
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
    console.error("Error delete cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Eliminar Producto del carrito seleccionado mediante id
router.delete("/:cid/product/:pid", checkCart, async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await deleteProductToCart(cid, pid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    console.error("Error delete product in the cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Actualizar producto del carrito seleccionado mediante id del mismo.
router.put("/:cid/product/:pid", checkCart, async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await updateQuantityToProduct(cid, pid, Number(quantity));
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    console.error("Error update product in the cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await clearProductsToCart(cid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    console.error("Error clear products in the cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

export default router;
