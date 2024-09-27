import cartModel from "../models/cartModel";
import productModel from "../models/productModel";

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

    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        const productDetails = await getProductDetails(item.productId);
        return {
          ...item.toObject(), // Convert Mongoose document to a plain object
          productName: productDetails.name || 'Unknown Product',
          productImage: productDetails.image || 'default-image-url.jpg',
        };
      })
    );

    const totalQuantity = itemsWithDetails.reduce((acc, item) => acc + item.quantity, 0);

    const totalPrice = await Promise.all(
      itemsWithDetails.map(async (item) => item.quantity * await getProductPrice(item.productId))
    ).then(prices => prices.reduce((acc, price) => acc + price, 0));

    return { items: itemsWithDetails, totalQuantity, totalPrice };
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to retrieve cart items.");
  }
};

// Function to get product details
async function getProductDetails(productId: number) {
  const product = await productModel.findOne({ id: productId }); // Use 'id' if that is the field in your product schema
  if (!product) {
    return {
      name: "Unknown Product",
      image: "default-image-url.jpg", // Default image
    };
  }
  return { name: product.title, image: product.image || "default-image-url.jpg" }; // Use default image if none exists
}

// Function to remove a product from the cart
export const removeFromCart = async (productId: number) => {
  try {
    const result = await cartModel.deleteOne({ productId });
    if (result.deletedCount === 0) {
      throw new Error("No product found to remove.");
    }
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
