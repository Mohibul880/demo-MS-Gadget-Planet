import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../services/api.js";

const initialState = {
  name: "",
  brand: "",
  category: "",
  price: "",
  oldPrice: "",
  stock: "",
  image: "",
  description: "",
  featured: false,
};

const ProductForm = ({ reload, editItem, setEditItem }) => {
  const [formData, setFormData] = useState(initialState);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name || "",
        brand: editItem.brand || "",
        category: editItem.category || "",
        price: editItem.price || "",
        oldPrice: editItem.oldPrice || "",
        stock: editItem.stock || "",
        image: editItem.image || "",
        description: editItem.description || "",
        featured: editItem.featured || false,
      });
    } else {
      setFormData(initialState);
    }
  }, [editItem]);

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

      const { data } = await api.post("/products/upload", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData((prev) => ({
        ...prev,
        image: data.imageUrl,
      }));

      toast.success("Product image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Product image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...formData,
        price: Number(formData.price),
        oldPrice: Number(formData.oldPrice || 0),
        stock: Number(formData.stock),
      };

      if (editItem?._id) {
        await api.put(`/products/${editItem._id}`, payload);
        toast.success("Product updated successfully");
      } else {
        await api.post("/products", payload);
        toast.success("Product added successfully");
      }

      setFormData(initialState);
      setEditItem(null);
      reload();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Product save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData(initialState);
    setEditItem(null);
  };

  return (
    <section id="product-form" className="rounded-3xl bg-base-100 p-6 shadow">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          {editItem ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-sm opacity-70">
          Use this section to fully control products from admin panel.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input
          className="input input-bordered"
          name="name"
          placeholder="Product name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered"
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered"
          type="number"
          name="oldPrice"
          placeholder="Old price"
          value={formData.oldPrice}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered md:col-span-2"
          name="image"
          placeholder="Image URL (auto-filled after upload)"
          value={formData.image}
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Upload Product Image
          </label>
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
              alt="Product Preview"
              className="max-h-72 rounded-2xl border border-base-300 object-cover"
            />
          </div>
        )}

        <textarea
          className="textarea textarea-bordered md:col-span-2"
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label className="label cursor-pointer rounded-xl border border-base-300 px-4 py-3 md:col-span-2">
          <span className="label-text">Featured product</span>
          <input
            className="checkbox checkbox-primary"
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
        </label>

        <div className="md:col-span-2 flex gap-3">
          <button className="btn btn-primary" disabled={saving || uploading}>
            {saving
              ? editItem
                ? "Updating..."
                : "Adding..."
              : editItem
              ? "Update Product"
              : "Add Product"}
          </button>

          {editItem && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default ProductForm;