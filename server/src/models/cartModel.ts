import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  productId: number;
  quantity: number;
}

const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const cartModel = mongoose.model<ICartItem>("Cart", cartItemSchema);

export default cartModel;