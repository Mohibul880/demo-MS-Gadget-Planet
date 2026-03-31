// ==============================
// Product Card Component
// ==============================
import { useState } from "react";
import useCart from "../../../hooks/useCart.js";
import OrderModal from "../../forms/OrderModal/OrderModal.jsx";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="card border border-base-300 bg-base-100 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
        <figure className="h-60 overflow-hidden"><img src={product.image} alt={product.name} className="h-full w-full object-cover" /></figure>
        <div className="card-body">
          <div className="flex items-start justify-between gap-3">
            <div><h2 className="card-title">{product.name}</h2><p className="text-sm text-gray-500">{product.brand} • {product.category}</p></div>
            {product.featured && <div className="badge badge-primary">Featured</div>}
          </div>
          <p className="text-sm leading-6">{product.description}</p>
          <div className="mt-2 flex items-center gap-2"><span className="text-2xl font-bold text-brand">${product.price}</span>{product.oldPrice > 0 && <span className="text-sm line-through opacity-60">${product.oldPrice}</span>}</div>
          <div className="mt-1 text-sm">Stock: <span className="font-semibold">{product.stock}</span></div>
          <div className="card-actions mt-4 justify-end">
            <button className="btn btn-outline btn-sm" onClick={() => addToCart(product)}>Add to Cart</button>
            <button className="btn btn-primary btn-sm" onClick={() => setOpenModal(true)}>Order Now</button>
          </div>
        </div>
      </div>
      {openModal && <OrderModal product={product} onClose={() => setOpenModal(false)} />}
    </>
  );
};
export default ProductCard;
