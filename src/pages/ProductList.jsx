import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import API from "../services/api";

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Pricing Plans
        </h1>

        <Link
          to="/admin/add-product"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            highlight={p.name === "Plus"}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;