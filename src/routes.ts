// cspell: ignore  Ipunts
import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  UpdateProduct,
} from "./handlers/products";
import { body, param } from "express-validator";
import { handleIpuntsError } from "./middleware";

const router = Router();

// Routing
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleIpuntsError,
  getProductById
);
router.post(
  "/",
  body("name").notEmpty().withMessage("El campo Nombre no puede estar vacío"),
  body("price")
    .isNumeric()
    .withMessage("El campo Precio debe ser numérico")
    .notEmpty()
    .withMessage("El campo Precio no puede estar vacío")
    .custom((value) => value > 0)
    .withMessage("El campo Precio debe ser un valor positivo"),
  handleIpuntsError,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleIpuntsError,
  UpdateProduct
);
router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleIpuntsError,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleIpuntsError,
  deleteProduct
);

export default router;
