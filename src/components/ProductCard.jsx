import { useNavigate } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";

function ProductCard({ product, highlight, onDelete, onEdit }) {
  const navigate = useNavigate();

  // ✅ SMART FEATURES FIX
  const featuresList =
    product.features && product.features.length > 0
      ? product.features
      : product.description
      ? product.description
          .split(/(?=[A-Z])/) // 🔥 split by capital letters
          .map((f) => f.trim())
          .filter((f) => f.length > 0)
      : [];

  return (
    <div
      className={`relative rounded-2xl p-6 bg-white border border-gray-200 
      shadow-sm hover:shadow-lg transition-all duration-300 
      flex flex-col justify-between h-full`}
    >
      {/* ACTION BUTTONS */}
      {product.isCustom && (
        <div className="absolute top-4 right-4 flex gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-700"
            >
              <Pencil size={18} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      )}

      {/* CONTENT */}
      <div>
        {/* Plan Name */}
        <h3 className="text-blue-600 text-sm font-semibold mb-3">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.price === 0 ? "Free" : `₹${product.price}`}
            {product.price !== 0 && (
              <span className="text-sm text-gray-500 font-normal">
                {" "}
                /month
              </span>
            )}
          </h1>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {featuresList.length > 0 ? (
            featuresList.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1 text-sm">✓</span>
                <span className="text-gray-700 text-sm leading-relaxed">
                  {feature}
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-sm">
              No features available
            </p>
          )}
        </ul>
      </div>

      {/* BUTTON (FIXED POSITION) */}
      <button
        onClick={() => navigate("/admin/payment", { state: product })}
        className="w-full py-3 rounded-xl bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 transition"
      >
        {product.price === 0 ? "Get Started" : "Buy Now"}
      </button>
    </div>
  );
}

export default ProductCard;