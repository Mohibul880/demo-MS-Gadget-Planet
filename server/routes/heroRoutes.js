import express from "express";
import {
  getHeroSection,
  updateHeroSection,
  uploadHeroImage,
} from "../controllers/heroController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getHeroSection);
router.put("/", updateHeroSection);
router.post("/upload", upload.single("image"), uploadHeroImage);

export default router;