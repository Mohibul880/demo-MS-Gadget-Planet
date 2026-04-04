import express from "express";
import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../controllers/productController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import productUpload from "../middleware/productUploadMiddleware.js";

const router = express.Router();

// upload route আগে রাখলাম
router.post("/upload", productUpload.single("image"), uploadProductImage);

router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/", protectAdmin, createProduct);
router.put("/:id", protectAdmin, updateProduct);
router.delete("/:id", protectAdmin, deleteProduct);

export default router;