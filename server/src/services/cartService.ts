import cartModel from "../models/cartModel";

export const addToCart = async (productId: number, quantity: number) => {
  const existingItem = await cartModel.findOne({ productId });
  if (existingItem) {
    existingItem.quantity += quantity;
    await existingItem.save();
  } else {
    const newItem = new cartModel({ productId, quantity });
    await newItem.save();
  }
};

export const getCartItems = async () => {
  return await cartModel.find();
};

export const removeFromCart = async (productId: number) => {
  await cartModel.deleteOne({ productId });
};