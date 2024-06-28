import { Router } from "express";
import productsRoutes from "./products.routes.js";
import cartsRoutes from "./carts.routes.js";
import categoryRoutes from "./category.routes.js";

const router = Router();

router.use("/products", productsRoutes);
router.use("/cart", cartsRoutes);
router.use("/category", categoryRoutes);

export default router;
