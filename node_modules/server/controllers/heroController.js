import HeroSection from "../models/HeroSection.js";

export const getHeroSection = async (_req, res) => {
  let hero = await HeroSection.findOne();

  if (!hero) {
    hero = await HeroSection.create({});
  }

  res.json(hero);
};

export const updateHeroSection = async (req, res) => {
  const { badge, title, subtitle, buttonText, buttonLink, image, isActive } =
    req.body;

  let hero = await HeroSection.findOne();

  if (!hero) {
    hero = await HeroSection.create({
      badge,
      title,
      subtitle,
      buttonText,
      buttonLink,
      image,
      isActive,
    });
  } else {
    hero.badge = badge;
    hero.title = title;
    hero.subtitle = subtitle;
    hero.buttonText = buttonText;
    hero.buttonLink = buttonLink;
    hero.image = image;
    hero.isActive = isActive;
    await hero.save();
  }

  res.json(hero);
};

export const uploadHeroImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/heroes/${req.file.filename}`;

  res.json({
    message: "Image uploaded successfully",
    imageUrl,
  });
};