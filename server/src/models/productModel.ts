import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string; // Added description field
}

const productSchema = new Schema<IProduct>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }, // Added description field
});

const productModel = mongoose.model<IProduct>("Products", productSchema);

export default productModel;