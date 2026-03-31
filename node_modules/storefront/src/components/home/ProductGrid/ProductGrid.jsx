// ==============================
// Product Grid Section
// ==============================
import { useEffect, useMemo, useState } from "react";
import api from "../../../services/api.js";
import ProductCard from "../../common/ProductCard/ProductCard.jsx";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesCategory =
          category === "All" || product.category === category;

        return matchesSearch && matchesCategory;
      }),
    [products, search, category]
  );

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold">Available Products</h2>
            <p className="mt-2 text-sm opacity-70">
              Customers can add products to cart or order directly.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              className="input input-bordered"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="select select-bordered"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-3xl bg-base-200"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;