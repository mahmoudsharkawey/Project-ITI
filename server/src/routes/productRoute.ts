import express from "express";
import { getAllProducts, getProductById } from "../services/productService"; // Import getProductById

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.get("/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10); 
  try {
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
