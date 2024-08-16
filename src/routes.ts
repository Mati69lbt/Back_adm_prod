import { Router } from "express";
import { createProduct } from "./handlers/products";
import { body } from "express-validator";

const router = Router();

// Routing
router.get("/", (req, res) => {
  res.send("Desde Get");
});
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
  createProduct
);

router.put("/", (req, res) => {
  res.send("Desde Put");
});
router.delete("/", (req, res) => {
  res.send("Desde Delete");
});

export default router;
