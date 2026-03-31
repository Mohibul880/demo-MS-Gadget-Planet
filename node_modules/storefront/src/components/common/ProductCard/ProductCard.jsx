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
      <div className="card group h-full overflow-hidden border border-base-300 bg-base-100 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
        
        {/* IMAGE BIG */}
        <figure className="h-72 overflow-hidden bg-base-200">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/no-image.png";
            }}
          />
        </figure>

        {/* BODY COMPACT */}
        <div className="card-body p-3">
          
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="card-title text-sm">{product.name}</h2>
              <p className="text-xs text-gray-500">
                {product.brand} • {product.category}
              </p>
            </div>

            {product.featured && (
              <div className="badge badge-primary badge-sm">Featured</div>
            )}
          </div>

          {/* 🔥 DESCRIPTION SMALL (1 LINE ONLY) */}
          <p className="text-xs line-clamp-1">
            {product.description}
          </p>

          {/* PRICE */}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-bold text-brand">
              ${product.price}
            </span>

            {product.oldPrice > 0 && (
              <span className="text-xs line-through opacity-60">
                ${product.oldPrice}
              </span>
            )}
          </div>

          {/* STOCK */}
          <div className="text-xs">
            Stock: <span className="font-semibold">{product.stock}</span>
          </div>

          {/* BUTTON */}
          <div className="card-actions mt-2 justify-end">
            <button
              className="btn btn-outline btn-xs"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-primary btn-xs"
              onClick={() => setOpenModal(true)}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <OrderModal product={product} onClose={() => setOpenModal(false)} />
      )}
    </>
  );
};

export default ProductCard;