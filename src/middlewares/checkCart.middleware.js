import productDao from "../dao/MongoDB/product.dao.js";
import { getCartById } from "../dao/MongoDB/cart.dao.js";

const checkCart = async (req, res, next) => {
  try {
    const product = await productDao.getProductsById(req.params.pid);
    if (!product)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el producto con el id ${req.params.pid}`,
      });
    const cart = await getCartById(req.params.cid);
    if (!cart)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${req.params.cid}`,
      });
    next();
  } catch (err) {
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

export default checkCart;
