import { Router } from "express";
import checkProduct from "../middlewares/checkProduct.middleware.js";
import productDao from "../dao/MongoDB/product.dao.js";

const router = Router();

//Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const { limit, page, sortField, sortOrder, category, status, maxPrice } =
      req.query;

    const options = {
      limit: Number(limit) > 0 ? Number(limit) : 5,
      page: Number(page) > 0 ? Number(page) : 1,
      sort: sortField
        ? { [sortField]: sortOrder === "asc" ? 1 : -1 }
        : { createdAt: -1 },
      lean: true,
    };

    const query = {};

    if (category) {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }
    if (maxPrice) {
      const maxPriceNumber = Number(maxPrice);
      if (isNaN(maxPriceNumber)) {
        return res
          .status(400)
          .json({ error: "Error, ingrese un numero valido" });
      }
      query.price = { $lt: maxPriceNumber };
    }

    const products = await productDao.getAllProducts(query, options);
    res.status(200).json({ status: "success", payload: products });
  } catch (err) {
    console.error("error al obtener los productos", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Obtener producto por Id
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productDao.getProductsById(pid);

    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: "Product Not Found" });
    res.status(200).json({ status: "success", product });
  } catch (err) {
    console.error("Error al obtener el producto", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Crear productos
router.post("/", checkProduct, async (req, res) => {
  try {
    const body = req.body;
    const product = await productDao.createProducts(body);

    res.status(201).json({ status: "success", product });
  } catch (err) {
    console.error("error al crear productos", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Actualizar producto por id
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    const product = await productDao.updateProducts(pid, body);

    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: "Product Not Found" });
    res.status(200).json({ status: "success", product });
  } catch (err) {
    console.error("error al actualizar los productos", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Actualizar estado a False para ocultar el producto
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productDao.deleteProducts(pid);

    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: "Product Not Found" });
    res.status(200).json({
      status: "success",
      msg: `The product with id: (${pid}) was deleted`,
    });
  } catch (err) {
    console.error("error al borrar los productos", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

export default router;
