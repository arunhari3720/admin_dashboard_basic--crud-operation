import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [discount, setDiscount] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    carId: "",
    model: "",
    price: ""
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const res = await API.get("/cars");
    setCars(res.data);
  };

  // 🔥 Add Car
  const handleAddCar = async () => {
    try {
      await API.post("/cars", {
        ...form,
        price: Number(form.price)
      });

      toast.success("Car added!");
      setShowForm(false);
      setForm({ carId: "", model: "", price: "" });
      fetchCars();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add car");
    }
  };

  // 🔥 Checkbox
  const toggleSelect = (carId) => {
    setSelectedCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };

  // 🔥 Bulk Apply
  const applyDiscount = async () => {
    if (selectedCars.length === 0) {
      return toast.error("Select cars");
    }

    if (!discount) {
      return toast.error("Select discount");
    }

    try {
      await API.put("/cars/bulk-discount", {
        carIds: selectedCars,
        discountPercentage: Number(discount)
      });

      toast.success("Discount applied!");

      setSelectedCars([]);
      setDiscount("");

      fetchCars();
    } catch (err) {
      console.log(err);
      toast.error("Failed to apply offers");
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-gray-700">
          🚗 Car Listing
        </h2>

        <div className="flex gap-3">

          {/* Discount Dropdown */}
          <select
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">Discount</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
          </select>

          {/* Apply */}
          <button
            onClick={applyDiscount}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Apply
          </button>

          {/* Add Car */}
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={16} />
            Add
          </button>

        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {cars.map((car) => (
          <div
            key={car._id}
            className={`bg-white rounded-xl p-5 shadow border ${
              selectedCars.includes(car.carId)
                ? "ring-2 ring-blue-300"
                : ""
            }`}
          >
            {/* Top */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{car.model}</h3>

              <input
                type="checkbox"
                checked={selectedCars.includes(car.carId)}
                onChange={() => toggleSelect(car.carId)}
              />
            </div>

            {/* Price */}
            <p className="text-blue-600 font-bold mt-2">
              ₹{car.price}
            </p>

            <p className="text-red-500 text-sm">
              Discount: {car.discountPercentage || 0}%
            </p>

            <p className="text-green-600 font-semibold">
              Final: ₹{car.finalPrice}
            </p>
          </div>
        ))}

      </div>

      {/* 🔥 Add Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h3 className="text-lg font-bold mb-4">Add Car</h3>

            <input
              placeholder="Car ID"
              className="w-full border p-2 mb-3 rounded"
              value={form.carId}
              onChange={(e) =>
                setForm({ ...form, carId: e.target.value })
              }
            />

            <input
              placeholder="Model"
              className="w-full border p-2 mb-3 rounded"
              value={form.model}
              onChange={(e) =>
                setForm({ ...form, model: e.target.value })
              }
            />

            <input
              placeholder="Price"
              type="number"
              className="w-full border p-2 mb-3 rounded"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddCar}
                className="px-4 py-1 bg-blue-500 text-white rounded"
              >
                Add
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}