// ==============================
// Product Details Page
// ==============================
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api.js";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    quantity: 1,
  });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!product) return;

    try {
      const payload = {
        customerName: formData.customerName,
        phone: formData.phone,
        address: formData.address,
        quantity: Number(formData.quantity),
        items: [
          {
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: Number(formData.quantity),
            image: product.image,
          },
        ],
        totalAmount: product.price * Number(formData.quantity),
      };

      await api.post("/orders", payload);

      alert("Order placed successfully!");

      setFormData({
        customerName: "",
        phone: "",
        address: "",
        quantity: 1,
      });
    } catch (error) {
      console.error("Order submit failed:", error);
      alert("Order submit failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg">Loading product details...</p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg">Product not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Side - Product Image */}
          <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-[450px] w-full object-cover transition duration-500 hover:scale-105"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/no-image.png";
              }}
            />
          </div>

          {/* Right Side - Product Info + Order Form */}
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-lg">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <p className="mt-2 text-sm text-gray-500">
              {product.brand} • {product.category}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">
                ${product.price}
              </span>

              {product.oldPrice > 0 && (
                <span className="text-lg line-through opacity-60">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-7">{product.description}</p>

            <p className="mt-3 text-sm">
              Stock: <span className="font-semibold">{product.stock}</span>
            </p>

            <div className="my-6 border-t border-base-300"></div>

            <h2 className="mb-4 text-xl font-semibold">Order This Product</h2>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <input
                type="text"
                name="customerName"
                placeholder="Your Name"
                className="input input-bordered w-full"
                value={formData.customerName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="address"
                placeholder="Your Address"
                className="textarea textarea-bordered w-full"
                rows="4"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>

              <input
                type="number"
                name="quantity"
                min="1"
                className="input input-bordered w-full"
                value={formData.quantity}
                onChange={handleChange}
                required
              />

              <div className="rounded-lg bg-base-200 p-3 text-sm">
                Total Price:{" "}
                <span className="font-bold text-primary">
                  ${product.price * Number(formData.quantity)}
                </span>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;