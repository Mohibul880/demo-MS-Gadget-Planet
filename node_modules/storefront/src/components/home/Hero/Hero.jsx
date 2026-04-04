// ==============================
// Hero Section
// ==============================
import { useEffect, useState } from "react";
import api from "../../../services/api.js";

const Hero = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const { data } = await api.get("/hero");
        setHero(data);
      } catch (error) {
        console.error("Failed to load hero section:", error);
      }
    };

    loadHero();
  }, []);

  if (!hero || hero.isActive === false) return null;

  return (
    <section className="bg-gradient-to-r from-brand to-indigo-600 py-16 text-white">
      <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <span className="badge badge-secondary mb-4">{hero.badge}</span>

          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            {hero.title}
          </h1>

          <p className="mt-4 max-w-xl text-base md:text-lg">
            {hero.subtitle}
          </p>

          <a href={hero.buttonLink || "#products"} className="btn btn-secondary mt-6">
            {hero.buttonText}
          </a>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-2xl">
          {hero.image ? (
            <img
              src={hero.image}
              alt="Hero Banner"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-white/10 p-6 text-center text-lg backdrop-blur">
              Hero image not uploaded yet
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;