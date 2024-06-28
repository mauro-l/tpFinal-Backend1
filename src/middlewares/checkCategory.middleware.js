import { request, response } from "express";
import categoryDao from "../dao/MongoDB/category.dao.js";

const checkCategory = async (req = request, res = response, next) => {
  try {
    const { title, description, code } = req.body;

    const newCategory = {
      title,
      description,
      code,
    };

    //Verifica que esten todos los campos.
    const emptyFields = Object.values(newCategory).some(
      (value) =>
        value === undefined ||
        value === null ||
        value === "" ||
        (typeof value === "number" && isNaN(value))
    );
    if (emptyFields) {
      console.log(`Error: campos incompletos.`);
      return res
        .status(400)
        .json({ status: "Error", msg: "All fields are required." });
    }

    const categories = await categoryDao.getAllCategory();

    //Verifica si se repite algun codigo
    const categoryRepeat = categories.find((element) => element.code === code);
    if (categoryRepeat)
      return res.status(400).json({
        status: "Error",
        msg: `There is already a category with that code. (code: ${code}).`,
      });

    next();
  } catch (err) {
    console.error("error al verificar los datos de la categoria", err);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

export default checkCategory;
