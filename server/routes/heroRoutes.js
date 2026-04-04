// ==============================
// Hero Section Routes
// ==============================
import express from "express";
import {
  getHeroSection,
  updateHeroSection,
  uploadHeroImage,
} from "../controllers/heroController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getHeroSection);
router.put("/", protectAdmin, updateHeroSection);
router.post("/upload", protectAdmin, upload.single("image"), uploadHeroImage);

export default router;