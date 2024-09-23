import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../services/cartService";

const router = express.Router();

router.post("/", async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    await addToCart(productId, quantity);
    res.status(200).send("Item added to cart");
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.get("/", async (req, res) => {
  try {
    const cartItems = await getCartItems();
    res.status(200).json(cartItems);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    await removeFromCart(Number(productId));
    res.status(200).send("Item removed from cart");
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
