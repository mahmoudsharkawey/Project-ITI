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
      res.status(200).json({ message: "Item added to cart" }); // Ensure you're sending a JSON response
  } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Something went wrong!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const cartItems = await getCartItems();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error); 
    res.status(500).send("Something went wrong while fetching cart items");
  }
});

router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).send("Product ID is required");
  }

  try {
    await removeFromCart(Number(productId));
    res.status(200).send("Item removed from cart");
  } catch (error) {
    console.error('Error removing from cart:', error); // Log the error
    res.status(500).send("Something went wrong while removing the item from the cart");
  }
});

export default router;
