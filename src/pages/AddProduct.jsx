import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const API = "http://localhost:5000/api/products";

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null); // 🔥 EDIT STATE

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ VALIDATION
  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.price) {
      newErrors.price = "Price is required";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "Must be greater than 0";
    }

    if (!form.description.trim())
      newErrors.description = "Description is required";

    if (!form.features.trim())
      newErrors.features = "Enter at least one feature";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ ADD / UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const featuresArray = form.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        features: featuresArray,
        isCustom: true,
      };

      if (editId) {
        // 🔥 UPDATE
        await axios.put(`${API}/${editId}`, payload);
      } else {
        // 🔥 CREATE
        await axios.post(API, payload);
      }

      await fetchProducts();

      // RESET
      setForm({
        name: "",
        price: "",
        description: "",
        features: "",
      });

      setEditId(null);
      setErrors({});
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ EDIT PRODUCT
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      eatures: product.features?.join(", ") || "",
    });

    setEditId(product._id);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 p-10">
      
      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          ChatGPT Products
        </h1>

        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
            setForm({
              name: "",
              price: "",
              description: "",
              features: "",
            });
          }}
          className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
        >
          + Add Product
        </button>
      </div>

      {/* PRODUCT CARDS */}
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            highlight={p.name === "Plus"}
            onDelete={() => handleDelete(p._id)}
            onEdit={() => handleEdit(p)} // 🔥 EDIT
          />
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
            
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit}>
              
              {/* NAME */}
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 mb-1"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.name}
                </p>
              )}

              {/* PRICE */}
              <input
                type="text"
                placeholder="Price"
                className="w-full border p-2 mb-1"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
              {errors.price && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.price}
                </p>
              )}

              {/* DESCRIPTION */}
              <textarea
                placeholder="Description"
                className="w-full border p-2 mb-1"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
              {errors.description && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.description}
                </p>
              )}

              {/* FEATURES */}
              <input
                type="text"
                placeholder="Features (comma separated)"
                className="w-full border p-2 mb-1"
                value={form.features}
                onChange={(e) =>
                  setForm({
                    ...form,
                    features: e.target.value,
                  })
                }
              />
              {errors.features && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.features}
                </p>
              )}

              {/* BUTTONS */}
              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                  }}
                  className="text-gray-500"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  className="bg-sky-500 text-white px-4 py-2 rounded"
                >
                  {loading
                    ? editId
                      ? "Updating..."
                      : "Adding..."
                    : editId
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;