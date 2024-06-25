import express from "express";
import cors from "cors";
import handlebars from "express-handlebars";
import __dirname from "./__dirname.js";
import router from "./src/router/index.routes.js";
import { Server } from "socket.io";
import viewRoutes from "./src/router/views.routes.js";
import productManager from "./src/dao/fileSystem/productManager.js";
import { connectMongoDB } from "./src/config/mongoDB.config.js";

const PORT = 8080;
const app = express();
app.use(cors());

//BBDD
connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

//rutas de la api
app.use("/api", router);

//ruta de las vistas
app.use("/", viewRoutes);

const httpServer = app.listen(PORT, () =>
  console.log(`Server corriendo en⚡http://localhost:${PORT}`)
);

//configuracion de socket

export const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("new user connection");
  const products = await productManager.getProducts();
  io.emit("products", products);
});
