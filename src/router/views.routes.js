import { Router } from "express";
import productManager from "../dao/fileSystem/productManager.js";
import { io } from "../../app.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//mostrar productos

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//agregar producto

router.post("/realtimeproducts", async (req, res) => {
  try {
    const { title, price, description } = req.body;
    await productManager.addProduct({ title, price, description });
    const products = await productManager.getProducts();

    io.emit("products", products);

    res.render("realTimeProducts");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//borrar producto

router.delete("/realtimeproducts", async (req, res) => {
  try {
    const { id } = req.body;
    await productManager.deleteProducts(Number(id));
    const products = await productManager.getProducts();

    io.emit("products", products);

    res.render("realTimeProducts");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
