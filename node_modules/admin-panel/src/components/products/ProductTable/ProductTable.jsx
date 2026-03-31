// ==============================
// Product Management Table
// ==============================
import toast from "react-hot-toast";
import api from "../../../services/api.js";

const ProductTable = ({ products, reload, setEditItem }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try { await api.delete(`/products/${id}`); toast.success("Product deleted"); reload(); } catch (error) { toast.error(error.response?.data?.message || "Delete failed"); }
  };
  return <section id="product-table" className="rounded-3xl bg-base-100 p-6 shadow"><div className="mb-4"><h2 className="text-2xl font-bold">Manage Products</h2><p className="text-sm opacity-70">These products are shown on the customer website automatically.</p></div><div className="overflow-x-auto"><table className="table"><thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Featured</th><th>Actions</th></tr></thead><tbody>{products.map((product) => <tr key={product._id}><td>{product.name}</td><td>{product.category}</td><td>${product.price}</td><td>{product.stock}</td><td>{product.featured ? "Yes" : "No"}</td><td className="flex gap-2"><button className="btn btn-xs btn-info" onClick={() => setEditItem(product)}>Edit</button><button className="btn btn-xs btn-error" onClick={() => handleDelete(product._id)}>Delete</button></td></tr>)}</tbody></table></div></section>;
};
export default ProductTable;
