import express from "express";
import router from "./routes";
import db from "./config/db";
import colors from "colors";

// Conectar a Base de Datos
async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    console.log(colors.bgGreen.white("Conexión exitosa a la Base de  Datos"));
  } catch (error) {
    console.log(
      colors.red.underline(`Error al conectar la base de datos: ${error}`)
    );
    console.error(error);
  }
}

connectDB();

const server = express();

server.use("/api/productos", router);

export default server;
