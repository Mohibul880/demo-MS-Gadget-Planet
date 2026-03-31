// ==============================
// Seed Default Products to MongoDB
// ==============================
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Product from "../models/Product.js";
import { products } from "../data/products.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("15 products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
