import express from "express";
import router from "./routes";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
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

//permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
server.use(cors());
// server.use(cors(corsOptions));

// Leer Datos de formularios
server.use(express.json());

server.use(morgan("dev"));

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
