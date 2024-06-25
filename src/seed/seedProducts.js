/* import fs from "fs";
import { productModel } from "../dao/MongoDB/models/products.model.js";

export const seedUserToDB = async () => {
  try {
    const product = await fs.promises.readFile(
      "./src/seed/products.json",
      "utf-8"
    );
    const parseProducts = await JSON.parse(product);
    console.log(parseProducts);
    await productModel.insertMany(parseProducts);
    console.log(`Its ok ✅`);
  } catch (err) {
    console.log("Error create products from JSON", err.message);
  }
};
 */
