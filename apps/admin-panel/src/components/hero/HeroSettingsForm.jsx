import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api.js";

const initialState = {
  badge: "",
  title: "",
  subtitle: "",
  buttonText: "",
  buttonLink: "",
  image: "",
  isActive: true,
};

const HeroSettingsForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadHero = async () => {
    try {
      const { data } = await api.get("/hero");
      setFormData({
        badge: data.badge || "",
        title: data.title || "",
        subtitle: data.subtitle || "",
        buttonText: data.buttonText || "",
        buttonLink: data.buttonLink || "",
        image: data.image || "",
        isActive: data.isActive ?? true,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load hero section");
    }
  };

  useEffect(() => {
    loadHero();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const uploadData = new FormData();
      uploadData.append("image", file);

      const { data } = await api.post("/hero/upload", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData((prev) => ({
        ...prev,
        image: data.imageUrl,
      }));

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await api.put("/hero", formData);
      toast.success("Hero section updated successfully");
      await loadHero();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Hero update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="hero-settings" className="rounded-3xl bg-base-100 p-6 shadow">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Hero Section Settings</h2>
        <p className="text-sm opacity-70">
          এখান থেকে Hero Section-এর text, button এবং image change করতে পারবেন।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input
          className="input input-bordered"
          name="badge"
          placeholder="Badge text"
          value={formData.badge}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered"
          name="buttonText"
          placeholder="Button text"
          value={formData.buttonText}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered md:col-span-2"
          name="title"
          placeholder="Hero title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          className="textarea textarea-bordered md:col-span-2"
          name="subtitle"
          placeholder="Hero subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          rows="4"
          required
        />

        <input
          className="input input-bordered"
          name="buttonLink"
          placeholder="Button link (#products)"
          value={formData.buttonLink}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered"
          name="image"
          placeholder="Image URL (auto-filled after upload)"
          value={formData.image}
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Upload Hero Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageUpload}
          />
          {uploading && (
            <p className="mt-2 text-sm text-primary">Uploading image...</p>
          )}
        </div>

        {formData.image && (
          <div className="md:col-span-2">
            <p className="mb-2 text-sm font-medium">Image Preview</p>
            <img
              src={formData.image}
              alt="Hero Preview"
              className="max-h-72 rounded-2xl border border-base-300 object-cover"
            />
          </div>
        )}

        <label className="label cursor-pointer rounded-xl border border-base-300 px-4 py-3 md:col-span-2">
          <span className="label-text">Hero section active</span>
          <input
            className="checkbox checkbox-primary"
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
        </label>

        <div className="md:col-span-2">
          <button className="btn btn-primary" disabled={saving || uploading}>
            {saving ? "Saving..." : "Save Hero Settings"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default HeroSettingsForm;