// ==============================
// Product Routes
// ==============================
import express from "express";
import { getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/", protectAdmin, createProduct);
router.put("/:id", protectAdmin, updateProduct);
router.delete("/:id", protectAdmin, deleteProduct);
export default router;
