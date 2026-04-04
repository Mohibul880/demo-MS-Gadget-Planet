// ==============================
// Hero Section Model
// ==============================
import mongoose from "mongoose";

const heroSectionSchema = new mongoose.Schema(
  {
    badge: {
      type: String,
      default: "Gadget Store",
    },
    title: {
      type: String,
      default: "Smart gadgets, fast orders, simple shopping.",
    },
    subtitle: {
      type: String,
      default:
        "Explore headphones, cameras, accessories, wearables and more. Add to cart or place an order directly from MS Gadget Planet.",
    },
    buttonText: {
      type: String,
      default: "Browse Products",
    },
    buttonLink: {
      type: String,
      default: "#products",
    },
    image: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const HeroSection = mongoose.model("HeroSection", heroSectionSchema);

export default HeroSection;