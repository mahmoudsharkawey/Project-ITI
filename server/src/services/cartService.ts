import cartModel from "../models/cartModel";

// Function to add a product to the cart
export const addToCart = async (productId: number, quantity: number) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  try {
    const existingItem = await cartModel.findOne({ productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return existingItem; // Return updated item
    } else {
      const newItem = new cartModel({ productId, quantity });
      await newItem.save();
      return newItem; // Return newly added item
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add item to cart.");
  }
};

// Function to get all cart items along with totals
export const getCartItems = async () => {
  try {
    const items = await cartModel.find();
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    // Assuming that getProductPrice is an async function
    const totalPrice = await Promise.all(
      items.map(async (item) => item.quantity * await getProductPrice(item.productId))
    ).then(prices => prices.reduce((acc, price) => acc + price, 0));

    return { items, totalQuantity, totalPrice };
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to retrieve cart items.");
  }
};

// Function to remove a product from the cart
export const removeFromCart = async (productId: number) => {
  try {
    await cartModel.deleteOne({ productId });
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw new Error("Failed to remove item from cart.");
  }
};

// Placeholder function to get the product price by ID
const getProductPrice = async (productId: number): Promise<number> => {
  // Replace this with your actual implementation
  return 20.0; // Example price
};
