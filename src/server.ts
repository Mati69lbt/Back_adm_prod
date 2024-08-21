import express from "express";
import router from "./routes";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express"
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// Conectar a Base de Datos
async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    // console.log(colors.bgGreen.white("Conexión exitosa a la Base de  Datos"));
  } catch (error) {
    console.log(
      colors.red.underline(`Error al conectar la base de datos: ${error}`)
    );
    console.error(error);
  }
}

connectDB();

// Instancia de Express
const server = express();

// Leer Datos de formularios
server.use(express.json());

server.use("/api/productos", router);

server.get("/api", (req, res) => {
  res.json({ msg: "Desde API" });
});

server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
