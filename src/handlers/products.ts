import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["name", "ASC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json({
      Cantidad: products.length,
      data: products,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
      error: error,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product: product });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
      error: error,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
      error: error,
    });
  }
};

export const UpdateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update(req.body);
    await product.save();

    res.json({ data: product });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
      error: error,
    });
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("id: ", id);

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.availability = !product.dataValues.availability;
    await product.save();
    res.json({ product: product });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
      error: error,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const productoDeleted = await product.destroy();
    res.json({
      status: "success",
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
      error: error,
    });
  }
};
