import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProducts } from "./services/productService";

dotenv.config();
const app = express();
const port = 3031;

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://youssefsalib311:cAi4mxiF5uwBX8rE@youssefservice.nl2yb.mongodb.net/e-commerces?retryWrites=true&w=majority&appName=YoussefService"
  )
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("Failed to connect!", err));

// Seed the products to database
seedInitialProducts();

app.use("/product", productRoute);
app.use("/cart", cartRoute); // Use cart route

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
